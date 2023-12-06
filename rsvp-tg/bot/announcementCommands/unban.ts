import TelegramBot from 'node-telegram-bot-api';
import { whitelist } from '@rsvp/db/dist/db/blacklist';

const unban = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text) {
    return;
  }

  const params = msg.text.split(' ');
  let banId: number = -1;
  try {
    banId = Number(params[2]);
    if (!banId) throw new Error();
  } catch (error) {
    bot.sendMessage(msg.chat.id, 'Id on viallinen');
  }

  await whitelist(banId);
  return await bot.sendMessage(
    msg.chat.id,
    `Käyttäjä idllä ${banId} otettu pois kuivumasta`,
    {
      reply_markup: {
        remove_keyboard: true,
      },
      reply_to_message_id: msg.message_id,
    }
  );
};

export default {
  handler: unban,
  command: 'pois kuivumasta',
};
