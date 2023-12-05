import TelegramBot from "node-telegram-bot-api";
import { addCustom } from "rsvp-db/db/custom";

const addCustomPerson = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text) return;

  const params = msg.text.split(" ");
  const name = params[1];

  if (!name || name.length < 3) {
    return await bot.sendMessage(
      msg.chat.id,
      `Käyttäjän nimi oli hieman erikoinen, en lisännyt`,
      {
        reply_markup: {
          remove_keyboard: true,
        },
        reply_to_message_id: msg.message_id,
      }
    );
  }

  await addCustom({ name, coming: true });

  return await bot.sendMessage(msg.chat.id, `Kävijä ${name} lisätty listalle`, {
    reply_markup: {
      remove_keyboard: true,
    },
    reply_to_message_id: msg.message_id,
  });
};

export default {
  handler: addCustomPerson,
  command: "lisää listaan",
};
