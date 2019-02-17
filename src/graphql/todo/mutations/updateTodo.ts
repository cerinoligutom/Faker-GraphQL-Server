import { Todo } from '@app/models';
import { UserInputError } from 'apollo-server-core';
import { MutationResolvers } from 'typings/app-graphql-schema';

const updateTodo: MutationResolvers.UpdateTodoResolver = async (
  parent,
  { id, description },
  { loaders }
) => {
  const todo = await Todo.query()
    .where('id', id)
    .first();

  if (!todo) {
    throw new UserInputError('Todo Item not found');
  }

  await loaders.todoById.clear(id);

  return Todo.query().patchAndFetchById(id, { description });
};

export default {
  updateTodo
};
