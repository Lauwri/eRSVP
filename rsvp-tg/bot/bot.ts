import TelegramBot from 'node-telegram-bot-api';
import createCommands from './commands/createCommands';
import onMessage from './onMessage';

export interface Config {
  token: string;
  announcementChannelId?: number;
  polling?: boolean;
}

export const createBot = ({
  token,
  announcementChannelId,
  polling = true,
}: Config) => {
  const bot = new TelegramBot(token, { polling });
  const commands = createCommands(bot);

  bot.on('message', onMessage(bot, commands));
  bot.on('new_chat_members', async (msg) => {
    console.log('new_chat_members', msg.chat.id);
    try {
      const chatMemberCount = await bot.getChatMemberCount(
        msg.chat.id
      );
      if (chatMemberCount > 2) {
        bot.sendMessage(msg.chat.id, 'Kiitos ryhmään pääsystä!');
        if (msg.chat.id !== announcementChannelId) {
          bot.leaveChat(msg.chat.id);
        }
      }
    } catch (error) {
      return;
    }
  });

  return bot;
};
