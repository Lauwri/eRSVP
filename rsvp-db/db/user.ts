import knex from "../knex";
import { Custom, Forms, Language, User, UserState } from "../dbTypes";

export const createUser = async (
  telegramId: number,
  chatId: number,
  state = UserState.none
) => {
  const user = await getUser(telegramId);
  if (user) return user;
  return await upsertUser({
    telegramId,
    chatId,
    language: Language.ENG,
    coming: false,
    state,
  });
};

export const getUser = async (
  telegramId: number
): Promise<User | undefined> => {
  return (await knex<User>("user").select("*").where({ telegramId }))[0];
};

export const getUsers = async (): Promise<User[]> => {
  return await knex<User>("user").select("*");
};

export const upsertUser = async (user: Omit<User, "id">) => {
  return (
    await knex<User>("user")
      .insert(user)
      .onConflict("telegramId")
      .merge()
      .returning("*")
  )[0];
};

export const deleteSignup = async (telegramId: number) => {
  return await knex<User>("user").where({ telegramId }).del();
};

export const setState = async (telegramId: number, state: UserState) => {
  return await knex<User>("user").where({ telegramId }).update({
    state,
  });
};

export const setLanguage = async (telegramId: number, language: Language) => {
  return await knex<User>("user").where({ telegramId }).update({
    language,
  });
};

export const setName = async (telegramId: number, name: string) => {
  return await knex<User>("user").where({ telegramId }).update({
    name,
  });
};

export const signup = async (
  telegramId: number,
  data: { avec: boolean; name: string }
) => {
  return await knex<User>("user")
    .where({ telegramId })
    .update({
      ...data,
      coming: true,
    });
};

export const signoff = async (telegramId: number) => {
  return await knex<User>("user").where({ telegramId }).update({
    coming: false,
  });
};

export const tgArrived = async (id: number, arrived: boolean) => {
  return await knex<User>("user").where({ id }).update({
    arrived,
  });
};

export const countComing = async () => {
  const results = (
    await knex.raw(`
    SELECT
      (SELECT COUNT(*) FROM public.forms WHERE coming = true) AS countForms,
      (SELECT COUNT(*) FROM public.user WHERE coming = true) AS countUser,
      (SELECT COUNT(*) FROM public.custom WHERE coming = true) AS countCustom;
  `)
  ).rows[0];
  return (
    Number(results.countforms) +
    Number(results.countuser) +
    Number(results.countcustom)
  );
};

export const getComingList = async () => {
  return (
    await knex.raw(`
    SELECT name FROM public."user" u  WHERE coming = true
    UNION
    SELECT name FROM public.forms f  WHERE coming = true
    UNION
    SELECT name FROM public.custom c  WHERE coming = true;
  `)
  ).rows as { name: string }[];
};

export const getComingListSeparated = async () => {
  const tg = await knex<User>("user").select("*").where({ coming: true });
  const forms = await knex<Forms>("forms").select("*").where({ coming: true });
  const custom = await knex<Custom>("custom")
    .select("*")
    .where({ coming: true });

  return {
    tg,
    forms,
    custom,
  };
};
