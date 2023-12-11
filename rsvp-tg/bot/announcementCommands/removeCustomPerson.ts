import TelegramBot from 'node-telegram-bot-api';
import { deleteCustomByName } from 'rsvp-db';

const addCustomPerson = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text) return;

  const params = msg.text.split(' ');
  const name = params.slice(2).join(' ');

  if (!name || name.length < 3) {
    return await bot.sendMessage(
      msg.chat.id,
      `Käyttäjän nimi oli hieman erikoinen, en poistanut`,
      {
        reply_markup: {
          remove_keyboard: true,
        },
        reply_to_message_id: msg.message_id,
      }
    );
  }

  await deleteCustomByName(name);

  return await bot.sendMessage(
    msg.chat.id,
    `Kävijä ${name} poistettu listalta`,
    {
      reply_markup: {
        remove_keyboard: true,
      },
      reply_to_message_id: msg.message_id,
    }
  );
};

export default {
  handler: addCustomPerson,
  command: 'poista listalta',
};
