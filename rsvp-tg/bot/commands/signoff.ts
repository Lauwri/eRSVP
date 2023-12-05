import TelegramBot, { BotCommand } from "node-telegram-bot-api";
import { UserState } from "rsvp-db/dbTypes";
import { getUser, setState } from "rsvp-db/db/user";
import { getUserId, preventGroupChats } from "../bot.util";
import { getTranslations } from "../../util/lang";

export const regex = /\/signoff/;

export const command: BotCommand = {
  command: "signoff",
  description: "Signoff",
};
export const handler =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    console.log("Received command signoff");
    const pass = await preventGroupChats(bot, msg);
    if (!pass) {
      return;
    }

    const userId = getUserId(msg);
    if (!userId) {
      return bot.sendMessage(
        msg.chat.id,
        "I am very sorry, but something went wrong!"
      );
    }

    const user = await getUser(userId);
    if (!user) {
      return bot.sendMessage(
        msg.chat.id,
        "I don't know how you did this, but please start first!",
        {
          reply_markup: {
            keyboard: [[{ text: "/start" }]],
          },
        }
      );
    }
    const t = getTranslations(user.language);

    await setState(userId, UserState.confirm_cancel_signup);
    return await bot.sendMessage(msg.chat.id, t.confirm_cancel, {
      reply_markup: {
        keyboard: [[{ text: t.yes }], [{ text: t.no }]],
        one_time_keyboard: true,
      },
    });
  };

export default {
  command,
  handler,
  regex,
};
