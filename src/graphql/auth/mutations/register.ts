import { User } from '@app/models';
import { UserInputError } from 'apollo-server-errors';
import {
  IRegisterMutationResponse,
  MutationResolvers
} from 'typings/app-graphql-schema';

const register: MutationResolvers.RegisterResolver = async (
  parent,
  { input }
) => {
  if (!input.password.trim().length) {
    throw new UserInputError('Bad password.');
  }

  const existingUser = await User.query()
    .where('username', input.username)
    .first();

  if (existingUser) {
    throw new UserInputError('Username is already taken.');
  }

  const user = await User.query().insert({
    firstName: input.firstName,
    lastName: input.lastName,
    username: input.username,
    email: input.email,
    hash: input.password
  });
  return {
    success: Boolean(user)
  } as IRegisterMutationResponse;
};

export default {
  register
};
