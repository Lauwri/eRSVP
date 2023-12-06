const path = require('path');
const file = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: file });

if (
  !process.env.BotTelegramId ||
  !process.env.BotTelegramName ||
  !process.env.BotHTTPToken ||
  !process.env.BaseBotUrl ||
  !process.env.Port ||
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_DB ||
  !process.env.POSTGRES_PASSWORD
) {
  throw new Error('Missing database env vars!');
}
const BotTelegramId = process.env.BotTelegramId;
const BotTelegramName = process.env.BotTelegramName;
const BotHTTPToken = process.env.BotHTTPToken;
const FormsToken = process.env.FormsToken;
const BaseBotUrl = process.env.BaseBotUrl;
const AnnouncementChannelId: number | undefined = Number(
  process.env.AnnouncementChannelId
);
const AnnouncementTopicId: number | undefined = Number(
  process.env.AnnouncementTopicId
);
const MaxSignups = Number(process.env.MaxSignups);
const Port = Number(process.env.Port);

const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT);
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

export {
  BotTelegramId,
  BotTelegramName,
  BotHTTPToken,
  FormsToken,
  BaseBotUrl,
  AnnouncementChannelId,
  AnnouncementTopicId,
  MaxSignups,
  Port,
  DB_HOST,
  DB_PORT,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
};
export default {
  BotTelegramId,
  BotTelegramName,
  BotHTTPToken,
  FormsToken,
  BaseBotUrl,
  AnnouncementChannelId,
  MaxSignups,
  Port,
  DB_HOST,
  DB_PORT,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
};
