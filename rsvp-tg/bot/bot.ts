import TelegramBot from 'node-telegram-bot-api';
import { format } from 'date-fns';
import createCommands from './commands/createCommands';
import onMessage from './onMessage';
import { BotHTTPToken } from '../config';

export interface Config {
  polling?: boolean;
}

export const createBot = ({ polling = true }: Config) => {
  const bot = new TelegramBot(BotHTTPToken, { polling });
  const commands = createCommands(bot);

  bot.on('message', onMessage(bot, commands));

  console.log(
    `[${format(
      new Date(),
      'yyyy-MM-dd HH:mm:ss:SS'
    )}] RSVP Telegram bot started`
  );

  return bot;
};
