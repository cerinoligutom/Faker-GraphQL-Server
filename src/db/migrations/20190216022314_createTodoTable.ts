import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('todos', table => {
    table.string('id').notNullable();
    table.string('description');
    table.string('ownerId').notNullable();
    table.foreign('ownerId').references('id').inTable('users');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('todos');
};
