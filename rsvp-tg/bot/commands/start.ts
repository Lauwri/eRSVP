import TelegramBot, { BotCommand } from 'node-telegram-bot-api';
import { UserState } from '@rsvp/db/dist/dbTypes';
import { createUser, setState } from '@rsvp/db/dist/db/user';
import { getUserId, preventGroupChats } from '../bot.util';
import { getTranslations } from '../../util/lang';

export const regex = /\/start/;
export const command: BotCommand = {
  command: 'start',
  description: 'Start  using the bot',
};

export const handler =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    const pass = await preventGroupChats(bot, msg);
    if (!pass) {
      return;
    }

    const userId = getUserId(msg);
    console.log('Start using the bot', userId);

    if (!userId) {
      return bot.sendMessage(
        msg.chat.id,
        'I am very sorry, but something went wrong!'
      );
    }

    const user = await createUser(userId, msg.chat.id);

    const t = getTranslations(user.language);

    if (user.coming) {
      await setState(userId, UserState.none);
      return await bot.sendMessage(msg.chat.id, t.already_signed);
    }

    await setState(userId, UserState.select_language);
    bot.sendMessage(msg.chat.id, t.start, {
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
