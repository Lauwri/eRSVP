import { User } from "../dbTypes";
import knex from "../knex";

const clearDb = async () => {
  console.log("Removing all records from signup");
  await knex<User>("user").del().truncate();
  await knex<User>("forms").del().truncate();
  await knex<User>("custom").del().truncate();
  await knex<User>("blacklist").del().truncate();
  await knex<User>("messages_in").del().truncate();
  console.log("All records removed");
  process.exit(1);
};

clearDb();
