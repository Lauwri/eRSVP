import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .withSchema("public")
    .createTable("dates", (table) => {
      table.string("type").unique().primary();
      table.dateTime("date");
    })
    .createTable("user", (table) => {
      table.increments("id").unique().primary();
      table.bigInteger("telegramId").unique().primary();
      table.bigInteger("chatId");
      table.string("language");
      table.string("name").nullable();
      table.boolean("coming");
      table.boolean("avec");
      table.boolean("arrived");
      table.string("state");
      table.timestamps(true, true);
    })
    .createTable("forms", (table) => {
      table.increments("id").unique().primary();
      table.string("email").unique();
      table.string("name");
      table.boolean("coming");
      table.boolean("arrived");
      table.timestamps(true, true);
    })
    .createTable("custom", (table) => {
      table.increments("id").unique().primary();
      table.string("name");
      table.boolean("coming");
      table.boolean("arrived");
      table.timestamps(true, true);
    })
    .createTable("messages_in", (table) => {
      table.bigInteger("telegramId");
      table.bigInteger("messageId").primary();
      table.timestamps(true, true);
    })
    .createTable("blacklist", (table) => {
      table.bigInteger("telegramId").unique().primary();
      table.datetime("until");
      table.string("reason");
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema("public")
    .dropTable("forms")
    .dropTable("custom")
    .dropTable("messages_in")
    .dropTable("blacklist")
    .dropTable("user");
}
