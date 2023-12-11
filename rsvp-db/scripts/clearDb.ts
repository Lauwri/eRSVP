import knex from '../knex';

const clearDb = async () => {
  console.log('Removing all records from signup');
  await knex('user').del().truncate();
  await knex('forms').del().truncate();
  await knex('custom').del().truncate();
  await knex('blacklist').del().truncate();
  await knex('messages_in').del().truncate();
  console.log('All records removed');
  process.exit(1);
};

clearDb();
