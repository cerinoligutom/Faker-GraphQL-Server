import { User } from '@app/models';
import { QueryResolvers } from 'typings/app-graphql-schema';

const users: QueryResolvers.UsersResolver = async (parent, {}, {}) => {
  return User.query();
};

export default {
  users
};
