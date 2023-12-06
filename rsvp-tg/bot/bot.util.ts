import TelegramBot from 'node-telegram-bot-api';
import { AnnouncementChannelId, MaxSignups } from '../config';
import { blacklist } from '@rsvp/db/dist/db/blacklist';
import {
  addMessage,
  getMessagesWithTimeLimit,
} from '@rsvp/db/dist/db/messagesIn';

export const getUserId = (message: TelegramBot.Message) => {
  if (message.reply_to_message) {
    return message.reply_to_message.from?.id;
  }
  return message.from?.id;
};

export const maxCount = (count: number) => count >= MaxSignups;

export const preventGroupChats = async (
  bot: TelegramBot,
  msg: TelegramBot.Message
) => {
  try {
    const chatMemberCount = await bot.getChatMemberCount(msg.chat.id);
    if (chatMemberCount > 2) {
      if (msg.chat.id !== AnnouncementChannelId) {
        bot.leaveChat(msg.chat.id);
      }
      return false;
      //   return bot.sendMessage(msg.chat.id, "Kiitos ryhmään pääsystä!");
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const ensureNoSpam = async (
  bot: TelegramBot,
  msg: TelegramBot.Message
) => {
  const spanBanMin = 5;

  const userId = getUserId(msg);
  if (!userId) {
    return false;
  }
  await addMessage({ telegramId: userId, messageId: msg.message_id });
  const messages = await getMessagesWithTimeLimit(userId);
  const isSpam = messages.length >= 7;
  const until = new Date();
  until.setMinutes(until.getMinutes() + spanBanMin);
  if (isSpam) {
    bot.sendMessage(
      msg.chat.id,
      `Lähetät niin paljon viestejä, että hiljennän sinut ${spanBanMin} minuutiksi`
    );
    await blacklist({ telegramId: userId, reason: 'Spam', until });
    return true;
  }
  return false;
};
