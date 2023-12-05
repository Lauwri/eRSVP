import TelegramBot, { BotCommand } from "node-telegram-bot-api";
import { UserState } from "rsvp-db/dbTypes";
import { getUser, setState } from "rsvp-db/db/user";
import { getUserId, preventGroupChats } from "../bot.util";
import { getTranslations } from "../../util/lang";

export const regex = /\/language/;

export const command: BotCommand = {
  command: "language",
  description: "Select language",
};
export const handler =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    const pass = await preventGroupChats(bot, msg);
    if (!pass) {
      return;
    }

    console.log("Received command language");

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

    await setState(userId, UserState.select_language);
    return await bot.sendMessage(msg.chat.id, t.language_select, {
      reply_markup: {
        keyboard: [[{ text: t.suomi }], [{ text: t.english }]],
      },
    });
  };

export default {
  command,
  handler,
  regex,
};
