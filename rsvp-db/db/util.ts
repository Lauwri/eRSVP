import knex from '../knex';
import { Custom, Forms, Telegram } from '../types';

export const countComing = async () => {
  const results = (
    await knex.raw(`
    SELECT
      (SELECT COUNT(*) FROM public.forms WHERE coming = true) AS countForms,
      (SELECT COUNT(*) FROM public.telegram WHERE coming = true) AS countTelegram,
      (SELECT COUNT(*) FROM public.custom WHERE coming = true) AS countCustom;
  `)
  ).rows[0];
  return (
    Number(results.countforms) +
    Number(results.counttelegram) +
    Number(results.countcustom)
  );
};

export const getComingList = async () => {
  return (
    await knex.raw(`
    SELECT name FROM public."telegram" t  WHERE coming = true
    UNION ALL
    SELECT name FROM public.forms f  WHERE coming = true
    UNION ALL
    SELECT name FROM public.custom c  WHERE coming = true;
  `)
  ).rows as { name: string }[];
};

export const getComingListSeparated = async () => {
  const tg = await knex<Telegram>('telegram')
    .select('*')
    .where({ coming: true });
  const forms = await knex<Forms>('forms').select('*').where({ coming: true });
  const custom = await knex<Custom>('custom')
    .select('*')
    .where({ coming: true });

  return {
    tg,
    forms,
    custom,
  };
};
