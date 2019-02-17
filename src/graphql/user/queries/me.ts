import { QueryResolvers } from 'typings/app-graphql-schema';

const me: QueryResolvers.MeResolver = (parent, {}, { user, loaders }) => {
  return user.getDto();
};

export default {
  me
};
