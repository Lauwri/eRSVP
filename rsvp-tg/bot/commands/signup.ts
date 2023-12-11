import TelegramBot, { BotCommand } from 'node-telegram-bot-api';
import { countComing, getTelegram, setState, TelegramState } from 'rsvp-db';
import { getUserId, maxCount, preventGroupChats } from '../bot.util';
import { getTranslations } from '../../util/lang';

export const regex = /\/signup/;

export const command: BotCommand = {
  command: 'signup',
  description: 'Signup',
};
export const handler =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    const pass = await preventGroupChats(bot, msg, true);
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

    const user = await getTelegram(userId);
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
      await setState(userId, TelegramState.none);
      return await bot.sendMessage(msg.chat.id, t.event_full, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }

    if (!user.coming) {
      await setState(userId, TelegramState.signup_question);
      return await bot.sendMessage(msg.chat.id, t.signup_question, {
        reply_markup: {
          keyboard: [[{ text: t.yes }], [{ text: t.no }]],
        },
      });
    }

    await setState(userId, TelegramState.none);
    await bot.sendMessage(msg.chat.id, t.already_signed);
  };

export default {
  command,
  handler,
  regex,
};
