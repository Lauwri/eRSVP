import knex from '../knex';
import { MessagesIn } from '../types';

export const getMessagesWithTimeLimit = async (telegramId: number) => {
  const timelimit = new Date();
  timelimit.setSeconds(timelimit.getSeconds() - 5);
  return await knex<MessagesIn>('messages_in')
    .where({ telegramId })
    .where('created_at', '>', timelimit)
    .returning('*');
};

export const addMessage = async (message: Omit<MessagesIn, 'created_at'>) => {
  return (
    await knex<MessagesIn>('messages_in')
      .insert(message)
      .onConflict('messageId')
      .ignore()
      .returning('*')
  )[0];
};

export const removeMessage = async (telegramId: number, messageId: number) => {
  return (
    await knex<MessagesIn>('messages_in')
      .where({ telegramId, messageId })
      .delete()
      .returning('*')
  )[0];
};
