import TelegramBot from "node-telegram-bot-api";
import {
  setLanguage,
  setState,
  countComing,
  signup,
  signoff,
} from "rsvp-db/db/user";
import { Language, User, UserState } from "rsvp-db/dbTypes";
import { AnnouncementChannelId, AnnouncementTopicId } from "../../config";
import { getTranslations } from "../../util/lang";
import signupCommand from "../commands/signup";
import en from "../../static/en.json";
import fi from "../../static/fi.json";

enum YesNo {
  "YES" = "YES",
  "NO" = "NO",
}

const yesRegex = new RegExp(fi.yes + "|" + en.yes + "|juu|joo|kyl|khyl", "i");
const noRegex = new RegExp(fi.no + "|" + en.no, "i");
const cancelSignupRegex = new RegExp(
  fi.cancel_signup + "|" + en.cancel_signup,
  "i"
);

export const userCommands = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  user: User
) => {
  const t = getTranslations(user.language);
  const text = msg.text;
  const userId = user.telegramId;

  switch (user.state) {
    case UserState.select_language:
      // Validate language
      const userSelectedLanguage = text
        ? /suomi/i.test(text)
          ? Language.FIN
          : /english/i.test(text)
          ? Language.ENG
          : undefined
        : undefined;

      if (!userSelectedLanguage) {
        return bot.sendMessage(msg.chat.id, t.language_empty, {
          reply_markup: {
            keyboard: [[{ text: t.suomi }], [{ text: t.english }]],
          },
        });
      }

      // Set language and confirm to user
      await setLanguage(userId, userSelectedLanguage);
      await setState(userId, UserState.none);
      await bot.sendMessage(
        msg.chat.id,
        getTranslations(userSelectedLanguage).language_selected,
        {
          reply_markup: {
            remove_keyboard: true,
          },
        }
      );

      // User hasn't signed up for the event, prompt if wants to
      if (!user.coming) {
        return await signupCommand.handler(bot)(msg);
      }
      return;
    case UserState.signup_question:
      const userSelectedAnswer = text
        ? yesRegex.test(text)
          ? YesNo.YES
          : noRegex.test(text)
          ? YesNo.NO
          : undefined
        : undefined;

      if (!userSelectedAnswer) {
        return await bot.sendMessage(msg.chat.id, t.signup_question, {
          reply_markup: {
            keyboard: [[{ text: t.yes }], [{ text: t.no }]],
            one_time_keyboard: true,
          },
        });
      }

      if (userSelectedAnswer === YesNo.YES) {
        await setState(userId, UserState.set_name);
        return await bot.sendMessage(msg.chat.id, t.full_name, {
          reply_markup: {
            remove_keyboard: true,
          },
        });
      } else {
        return await bot.sendMessage(msg.chat.id, t.alrighty, {
          reply_markup: {
            remove_keyboard: true,
          },
        });
      }
    case UserState.set_name:
      if (!text || text.length < 3) {
        return await bot.sendMessage(msg.chat.id, t.short_name);
      }

      await signup(userId, { avec: false, name: text });
      await setState(userId, UserState.none);

      if (AnnouncementChannelId) {
        await bot.sendMessage(
          AnnouncementChannelId,
          `${fi.announce_added}: ${text}\nyhteensä: ${await countComing()}`,
          {
            message_thread_id: AnnouncementTopicId,
          }
        );
      }

      return await bot.sendMessage(msg.chat.id, t.added_text);
    case UserState.confirm_cancel_signup:
      // its not block scoped?????
      const userSelectedAnswer2 = text
        ? yesRegex.test(text)
          ? YesNo.YES
          : noRegex.test(text)
          ? YesNo.NO
          : undefined
        : undefined;

      if (userSelectedAnswer2 === YesNo.YES) {
        await signoff(userId);
        await bot.sendMessage(msg.chat.id, t.canceled_signup, {
          reply_markup: {
            remove_keyboard: true,
          },
        });

        if (AnnouncementChannelId) {
          await bot.sendMessage(
            AnnouncementChannelId,
            `${fi.announce_removed}: ${
              user.name
            }\nyhteensä: ${await countComing()}`,
            {
              message_thread_id: AnnouncementTopicId,
            }
          );
        }
      } else {
        await bot.sendMessage(msg.chat.id, t.close_one, {
          reply_markup: {
            remove_keyboard: true,
          },
        });
      }
      return await setState(userId, UserState.none);
    case UserState.help:
      if (text && cancelSignupRegex.test(text)) {
        await setState(userId, UserState.confirm_cancel_signup);
        return await bot.sendMessage(msg.chat.id, t.confirm_cancel, {
          reply_markup: {
            keyboard: [[{ text: t.yes }], [{ text: t.no }]],
            one_time_keyboard: true,
          },
        });
      }
      await setState(userId, UserState.none);
      return bot.sendMessage(msg.chat.id, t.alrighty);
    default:
      // User hasn't signed up for the event, prompt if wants to
      if (!user.coming) {
        return await signupCommand.handler(bot)(msg);
      }

      if (text === "420") {
        return bot.sendMessage(msg.chat.id, "Blaze it!", {
          reply_markup: {
            remove_keyboard: true,
          },
        });
      }
      if (text?.toLowerCase() === "mitä pesuohjelmaa suosittelet") {
        return bot.sendMessage(
          msg.chat.id,
          "Parhaat kuosit saa hienopesulla ja pulverilla",
          {
            reply_markup: {
              remove_keyboard: true,
            },
          }
        );
      }
      if (text?.toLowerCase() === "kerro vitsi") {
        return bot.sendMessage(msg.chat.id, "En", {
          reply_markup: {
            remove_keyboard: true,
          },
        });
      }

      await setState(userId, UserState.help);
      return bot.sendMessage(msg.chat.id, t.how_can_help, {
        reply_markup: {
          keyboard: [[{ text: t.cancel_signup }], [{ text: t.nevermind }]],
          one_time_keyboard: true,
        },
      });
  }
};

export default userCommands;
