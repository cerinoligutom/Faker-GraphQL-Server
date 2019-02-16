import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('todos', table => {
    table.string('id').notNullable();
    table.string('description');
    table.string('ownerId').notNullable();
    table.foreign('ownerId').references('id').inTable('users');
    table.boolean('isDone').notNullable().defaultTo(false);
    table.timestamp('createdAt').notNullable();
    table.timestamp('updatedAt').notNullable();
  });
};

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('todos');
};
