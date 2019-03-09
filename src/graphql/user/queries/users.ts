import { User } from '@app/models';
import { QueryResolvers } from '@app/graphql-generated-schema';

const users: QueryResolvers.UsersResolver = async (parent, {}, {}) => {
  const allUsers = await User.query();

  return allUsers.map(user => user.getDto());
};

export default {
  users
};
