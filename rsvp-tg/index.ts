import { BotHTTPToken, AnnouncementChannelId } from './config';
import { createBot } from './bot/bot';
import { format } from 'date-fns';

console.log(
  `[${format(
    new Date(),
    'yyyy-MM-dd HH:mm:ss:SS'
  )}] RSVP Telegram bot started`
);

createBot({
  token: BotHTTPToken,
  announcementChannelId: AnnouncementChannelId,
});
