import TelegramBot from 'node-telegram-bot-api';
import { format } from 'date-fns';
import { Command } from './commands/createCommands';
import { getUserId } from './bot.util';
import useAnnouncementCommands, {
  isAnnouncementCommand,
} from './announcementCommands/announcementCommands';
import { getTelegram } from 'rsvp-db';
import userCommands from './userCommands/userCommands';
import validateMessage from './botValidation';
import { AnnouncementChannelId } from '../config';

const onMessage =
  (bot: TelegramBot, commands: Command[]) =>
  async (msg: TelegramBot.Message) => {
    // Get user id from message
    const userId = getUserId(msg);
    if (!userId) {
      return bot.sendMessage(
        msg.chat.id,
        'I am very sorry, but something went wrong!'
      );
    }

    // Check for ban, spam and groupchats
    const pass = await validateMessage(bot, msg);
    if (!pass) return;

    const text = msg.text;
    if (!text) return;

    console.log(
      `[${format(
        new Date(),
        'yyyy-MM-dd HH:mm:ss:SS'
      )}] Received a message user=${msg.from?.username} id=${userId} chatId=${
        msg.chat.id
      } text: `,
      text
    );

    // Check that message is not a slash command
    if (commands.some((c) => c.regex.test(text))) return;

    // Check if message is announcement command, fire command if it is and return
    if (msg.chat.id === AnnouncementChannelId) {
      if (isAnnouncementCommand(text)) await useAnnouncementCommands(bot, msg);
      return;
    }

    // Ensure user exists (it really should at this point)
    const user = await getTelegram(userId);
    if (!user) {
      return bot.sendMessage(msg.chat.id, 'Please start first!', {
        reply_markup: {
          keyboard: [[{ text: '/start' }]],
        },
      });
    }

    await userCommands(bot, msg, user);
  };

export default onMessage;
