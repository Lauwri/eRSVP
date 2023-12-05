import knex from "../knex";
import { Custom } from "../dbTypes";

export const getCustoms = async () => {
  return await knex<Custom>("custom").select("*");
};

export const addCustom = async (custom: Omit<Custom, "id">) => {
  return (await knex<Custom>("custom").insert(custom).returning("*"))[0];
};

export const deleteCustom = async (id: number) => {
  return (
    await knex<Custom>("custom").where({ id }).delete().returning("*")
  )[0];
};

export const deleteCustomByName = async (name: string) => {
  return (
    await knex<Custom>("custom")
      .whereIn("id", knex.select("id").from("custom").where({ name }).limit(1))
      .delete()
      .returning("*")
  )[0];
};

export const customArrived = async (id: number, arrived: boolean) => {
  return await knex<Custom>("custom").where({ id }).update({
    arrived,
  });
};
