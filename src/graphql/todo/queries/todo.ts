import { QueryResolvers } from 'typings/app-graphql-schema';

const todo: QueryResolvers.TodoResolver = (parent, { id }, { loaders }) => {
  return loaders.todoById.load(id);
};

export default {
  todo
};
