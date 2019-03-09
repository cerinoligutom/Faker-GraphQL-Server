import { QueryResolvers } from '@app/graphql-generated-schema';

const user: QueryResolvers.UserResolver = (parent, { id }, { loaders }) => {
  return loaders.userById.load(id);
};

export default {
  user
};
