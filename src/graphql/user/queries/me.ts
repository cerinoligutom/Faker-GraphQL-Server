import { QueryResolvers } from '@app/graphql-generated-schema';

const me: QueryResolvers.MeResolver = (parent, {}, { user, loaders }) => {
  return user.getDto();
};

export default {
  me
};
