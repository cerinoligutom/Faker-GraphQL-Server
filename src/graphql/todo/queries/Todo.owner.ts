import { TodoResolvers } from '@app/graphql-generated-schema';

const owner: TodoResolvers.OwnerResolver = async (parent, {}, { loaders }) => {
  const todo = await loaders.todoById.load(parent.id);
  return todo ? loaders.userById.load(todo.ownerId) : null;
};

export default {
  Todo: {
    owner
  }
};
