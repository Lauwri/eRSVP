import TelegramBot, { BotCommand } from "node-telegram-bot-api";
import info from "./info";
import language from "./language";
import signoff from "./signoff";
import signup from "./signup";
import start from "./start";

const commands: {
  handler: (
    bot: TelegramBot
  ) => (msg: TelegramBot.Message, match: RegExpExecArray | null) => void;
  command: BotCommand;
  regex: RegExp;
}[] = [start, info, signup, signoff, language];

export type Command = { regex: RegExp; command: string };
export default (bot: TelegramBot): Command[] => {
  bot.setMyCommands(commands.map((c) => c.command));
  commands.forEach((c) => {
    bot.onText(c.regex, c.handler(bot));
  });

  return commands.map((c) => ({ regex: c.regex, command: c.command.command }));
};
