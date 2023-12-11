import knex from '../knex';
import { Blacklist } from '../types';

export const inBlacklist = async (telegramId: number) => {
  return await knex<Blacklist>('blacklist')
    .select('*')
    .where({ telegramId })
    .where('until', '>', new Date())
    .first();
};

export const blacklist = async (blacklist: Blacklist) => {
  return (
    await knex<Blacklist>('blacklist')
      .insert(blacklist)
      .onConflict('telegramId')
      .merge()
      .returning('*')
  )[0];
};

export const whitelist = async (telegramId: number) => {
  return (
    await knex<Blacklist>('blacklist')
      .where({ telegramId })
      .delete()
      .returning('*')
  )[0];
};
