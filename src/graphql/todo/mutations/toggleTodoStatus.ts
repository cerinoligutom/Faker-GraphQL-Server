import { Todo } from '@app/models';
import { UserInputError } from 'apollo-server-core';
import { MutationResolvers } from 'typings/app-graphql-schema';

const toggleTodoStatus: MutationResolvers.ToggleTodoStatusResolver = async (
  parent,
  { id },
  { loaders }
) => {
  const todo = await Todo.query()
    .where('id', id)
    .first();

  if (!todo) {
    throw new UserInputError('Todo Item not found');
  }

  await loaders.todoById.clear(id);

  return Todo.query().patchAndFetchById(id, {
    isDone: !todo.isDone
  });
};

export default {
  toggleTodoStatus
};
