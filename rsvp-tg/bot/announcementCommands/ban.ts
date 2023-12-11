import TelegramBot from 'node-telegram-bot-api';
import { blacklist } from 'rsvp-db';

const ban = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  if (!msg.text) {
    return;
  }
  const params = msg.text.split(' ');
  const banId = Number(params[1]);
  const untilDays = Number(params[2]);
  const untilHours = Number(params[3]);
  const reason = params[4];
  const until = new Date();
  until.setDate(until.getDate() + untilDays);
  until.setHours(until.getHours() + untilHours);

  if (!banId || banId < 10) {
    return await bot.sendMessage(
      msg.chat.id,
      `Käyttäjän id ${banId} ei ole oikein`,
      {
        reply_markup: {
          remove_keyboard: true,
        },
        reply_to_message_id: msg.message_id,
      }
    );
  }

  await blacklist({ telegramId: banId, until, reason });
  return await bot.sendMessage(
    msg.chat.id,
    `Käyttäjä idllä ${banId} laitettu kuivumaan ${untilDays} päiväksi ja ${untilHours} tunniksi`,
    {
      reply_markup: {
        remove_keyboard: true,
      },
      reply_to_message_id: msg.message_id,
    }
  );
};

export default {
  handler: ban,
  command: 'kuivumaan',
};
