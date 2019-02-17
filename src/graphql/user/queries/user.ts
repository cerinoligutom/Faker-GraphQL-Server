import { QueryResolvers } from 'typings/app-graphql-schema';

const user: QueryResolvers.UserResolver = (parent, { id }, { loaders }) => {
  return loaders.userById.load(id);
};

export default {
  user
};
