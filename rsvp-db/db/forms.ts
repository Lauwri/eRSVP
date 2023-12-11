import knex from '../knex';
import { Forms } from '../types';

export const getForms = async () => {
  return await knex<Forms>('forms').select('*');
};

export const addForm = async (form: Omit<Forms, 'id'>) => {
  return (await knex<Forms>('forms').insert(form).returning('*'))[0];
};

export const deleteForm = async (id: number) => {
  return (await knex<Forms>('forms').where({ id }).delete().returning('*'))[0];
};
export const deleteFormByEmail = async (email: string) => {
  return (
    await knex<Forms>('forms').where({ email }).delete().returning('*')
  )[0];
};

export const formsArrived = async (id: number, arrived: boolean) => {
  return await knex<Forms>('forms').where({ id }).update({
    arrived,
  });
};
