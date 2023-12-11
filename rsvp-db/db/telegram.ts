import knex from '../knex';
import { Language, Telegram, TelegramState } from '../types';

export const createTelegram = async (
  telegramId: number,
  chatId: number,
  state = TelegramState.none
) => {
  const Telegram = await getTelegram(telegramId);
  if (Telegram) return Telegram;
  return await upsertTelegram({
    telegramId,
    chatId,
    language: Language.ENG,
    coming: false,
    state,
  });
};

export const getTelegram = async (
  telegramId: number
): Promise<Telegram | undefined> => {
  return (
    await knex<Telegram>('telegram').select('*').where({ telegramId })
  )[0];
};

export const getTelegrams = async (): Promise<Telegram[]> => {
  return await knex<Telegram>('telegram').select('*');
};

export const upsertTelegram = async (Telegram: Omit<Telegram, 'id'>) => {
  return (
    await knex<Telegram>('telegram')
      .insert(Telegram)
      .onConflict('telegramId')
      .merge()
      .returning('*')
  )[0];
};

export const deleteSignup = async (telegramId: number) => {
  return await knex<Telegram>('telegram').where({ telegramId }).del();
};

export const setState = async (telegramId: number, state: TelegramState) => {
  return await knex<Telegram>('telegram').where({ telegramId }).update({
    state,
  });
};

export const setLanguage = async (telegramId: number, language: Language) => {
  return await knex<Telegram>('telegram').where({ telegramId }).update({
    language,
  });
};

export const setName = async (telegramId: number, name: string) => {
  return await knex<Telegram>('telegram').where({ telegramId }).update({
    name,
  });
};

export const signup = async (
  telegramId: number,
  data: { avec: boolean; name: string }
) => {
  return await knex<Telegram>('telegram')
    .where({ telegramId })
    .update({
      ...data,
      coming: true,
    });
};

export const signoff = async (telegramId: number) => {
  return await knex<Telegram>('telegram').where({ telegramId }).update({
    coming: false,
  });
};

export const tgArrived = async (id: number, arrived: boolean) => {
  return await knex<Telegram>('telegram').where({ id }).update({
    arrived,
  });
};
