import TelegramBot from "node-telegram-bot-api";
import { inBlacklist } from "rsvp-db/db/blacklist";
import { ensureNoSpam, getUserId, preventGroupChats } from "./bot.util";

const validateMessage = async (
  bot: TelegramBot,
  msg: TelegramBot.Message
): Promise<boolean> => {
  const userId = getUserId(msg);
  if (!userId) return false;

  const isBlacklisted = await inBlacklist(userId);
  if (isBlacklisted?.telegramId) return false;

  const isSpam = await ensureNoSpam(bot, msg);
  if (isSpam) return false;

  const pass = await preventGroupChats(bot, msg);
  if (!pass) return false;

  return true;
};

export default validateMessage;
