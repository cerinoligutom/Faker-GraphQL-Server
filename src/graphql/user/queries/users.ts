import { User } from '@app/models';
import { QueryResolvers } from 'typings/app-graphql-schema';

const users: QueryResolvers.UsersResolver = async (parent, {}, {}) => {
  const allUsers = await User.query();

  return allUsers.map(user => user.getDto());
};

export default {
  users
};
