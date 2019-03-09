import { User } from '@app/models';
import { IJwtPayload, jwtService, passwordService } from '@app/utils';
import { UserInputError } from 'apollo-server-core';
import {
  ILoginMutationResponse,
  MutationResolvers
} from '@app/graphql-generated-schema';

const login: MutationResolvers.LoginResolver = async (
  parent,
  { password, username }
) => {
  const user = await User.query()
    .where('username', username)
    .first();

  if (!user) {
    throw new UserInputError('User does not exist.');
  }

  const isValidPassword = await passwordService.verify(
    password,
    user.hash,
    user.salt
  );

  if (!isValidPassword) {
    throw new UserInputError('Wrong password. Please try again.');
  }

  const payload: IJwtPayload = {
    userId: user.id
  };

  const token = jwtService.sign(payload);

  return {
    token
  } as ILoginMutationResponse;
};

export default {
  login
};
