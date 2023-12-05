import TelegramBot, { BotCommand } from "node-telegram-bot-api";
import { getUser } from "rsvp-db/db/user";
import { getUserId, preventGroupChats } from "../bot.util";
import { getTranslations } from "../../util/lang";

export const regex = /\/info/;
export const command: BotCommand = {
  command: "info",
  description: "Event information",
};

export const handler =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
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
      return bot.sendMessage(msg.chat.id, "Please start first!", {
        reply_markup: {
          keyboard: [[{ text: "/start" }]],
        },
      });
    }

    const t = getTranslations(user.language);

    return bot.sendMessage(msg.chat.id, t.info);
  };

export default {
  command,
  handler,
  regex,
};
