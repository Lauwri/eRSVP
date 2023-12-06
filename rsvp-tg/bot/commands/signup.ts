import TelegramBot, { BotCommand } from 'node-telegram-bot-api';
import { UserState } from '@rsvp/db/dist/dbTypes';
import {
  countComing,
  getUser,
  setState,
} from '@rsvp/db/dist/db/user';
import { getUserId, maxCount, preventGroupChats } from '../bot.util';
import { getTranslations } from '../../util/lang';

export const regex = /\/signup/;

export const command: BotCommand = {
  command: 'signup',
  description: 'Signup',
};
export const handler =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    console.log('Received command signup');
    const pass = await preventGroupChats(bot, msg);
    if (!pass) {
      return;
    }

    const userId = getUserId(msg);
    if (!userId) {
      return bot.sendMessage(
        msg.chat.id,
        'I am very sorry, but something went wrong!'
      );
    }

    const user = await getUser(userId);
    if (!user) {
      return bot.sendMessage(
        msg.chat.id,
        "I don't know how you did this, but please start first!",
        {
          reply_markup: {
            keyboard: [[{ text: '/start' }]],
          },
        }
      );
    }
    const t = getTranslations(user.language);

    const maxed = maxCount(await countComing());

    if (maxed) {
      await setState(userId, UserState.none);
      return await bot.sendMessage(msg.chat.id, t.event_full, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }

    if (!user.coming) {
      await setState(userId, UserState.signup_question);
      return await bot.sendMessage(msg.chat.id, t.signup_question, {
        reply_markup: {
          keyboard: [[{ text: t.yes }], [{ text: t.no }]],
        },
      });
    }

    await setState(userId, UserState.none);
    await bot.sendMessage(msg.chat.id, t.already_signed);
  };

export default {
  command,
  handler,
  regex,
};
