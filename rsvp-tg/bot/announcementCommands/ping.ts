import TelegramBot from "node-telegram-bot-api";

const ping = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  return await bot.sendMessage(msg.chat.id, "Pyykkään", {
    reply_markup: {
      remove_keyboard: true,
    },
    reply_to_message_id: msg.message_id,
  });
};

export default {
  handler: ping,
  command: "pyykkäätkö",
};
