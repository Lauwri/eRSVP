import TelegramBot from "node-telegram-bot-api";
import { getComingList } from "rsvp-db/db/user";

const countAttendees = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  const coming = await getComingList();

  return await bot.sendMessage(
    msg.chat.id,
    `${coming.map((c, i) => `${i + 1}. ${c.name}`).join("\n")}\n\nYhteensä: ${
      coming.length
    }`,
    {
      reply_markup: {
        remove_keyboard: true,
      },
      reply_to_message_id: msg.message_id,
    }
  );
};

export default {
  handler: countAttendees,
  command: "listaa ilmoittautuneet",
};
