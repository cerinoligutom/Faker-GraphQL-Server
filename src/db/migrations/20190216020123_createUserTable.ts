import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', table => {
    table.string('id').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('username').notNullable();
    table.string('email');
    table.string('avatarUrl');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.string('hash').notNullable();
    table.string('salt').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('users');
}
