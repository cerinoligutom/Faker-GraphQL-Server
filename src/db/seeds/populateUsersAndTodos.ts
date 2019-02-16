import * as faker from 'faker';
import * as Knex from 'knex';
import shortid from 'shortid';
import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';

function getRandomIntBetweenTwoNumbers(min: number = 1, max: number = 10) {
  // tslint:disable-next-line
  min = Math.ceil(min);
  // tslint:disable-next-line
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

export async function seed(knex: Knex): Promise<any> {
  const USER_COUNT = 15;
  const users: any[] = [...Array(USER_COUNT)].fill(0).map(() => {
    const user = {
      id: shortid.generate(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatarUrl: faker.internet.avatar(),
      hash: faker.internet.password(),
      salt: 'SEED GENERATED'
    } as User;

    return user;
  });

  let todos: Todo[] = [];
  users.forEach(user => {
    const TODO_COUNT = getRandomIntBetweenTwoNumbers(5, 15);

    const generatedTodos = [...Array(TODO_COUNT)].fill(0).map(() => {
      const todo = {
        id: shortid.generate(),
        description: faker.lorem.sentence(),
        ownerId: user.id
      } as Todo;

      return todo;
    });
    todos = [...todos, ...generatedTodos];
  });

  await knex('users').del();
  await knex('users').insert(users);

  await knex('todos').del();
  await knex('todos').insert(todos);

  return;
}
