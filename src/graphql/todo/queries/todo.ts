import { QueryResolvers } from '@app/graphql-generated-schema';

const todo: QueryResolvers.TodoResolver = (parent, { id }, { loaders }) => {
  return loaders.todoById.load(id);
};

export default {
  todo
};
