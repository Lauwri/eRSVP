import ban from './ban';
import countAttendees from './countAttendees';
import ping from './ping';
import unban from './unban';
import addCustomPerson from './addCustomPerson';
import TelegramBot from 'node-telegram-bot-api';
import removeCustomPerson from './removeCustomPerson';

export const announcementCommands = [
  ping,
  countAttendees,
  ban,
  unban,
  addCustomPerson,
  removeCustomPerson,
];

/**
 *
 * @param bot
 * @param msg
 * @returns true if command was matched
 */

export const useAnnouncementCommands = async (
  bot: TelegramBot,
  msg: TelegramBot.Message
) => {
  const command = announcementCommands.find(
    (c) => msg.text && msg.text.toLowerCase().startsWith(c.command)
  );
  command && (await command.handler(bot, msg));
};

export const isAnnouncementCommand = (testText: string) =>
  announcementCommands.some((c) =>
    testText.toLowerCase().startsWith(c.command)
  );

export default useAnnouncementCommands;
