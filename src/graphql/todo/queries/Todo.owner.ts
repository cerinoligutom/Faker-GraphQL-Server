import { TodoResolvers } from 'typings/app-graphql-schema';

const owner: TodoResolvers.OwnerResolver = async (parent, {}, { loaders }) => {
  const todo = await loaders.todoById.load(parent.id);
  return todo ? loaders.userById.load(todo.ownerId) : null;
};

export default {
  Todo: {
    owner
  }
};
