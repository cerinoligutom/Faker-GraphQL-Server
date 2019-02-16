import { rule } from 'graphql-shield';
import { IGraphQLContext } from '@app/utils';
import { AuthenticationError } from 'apollo-server-express';

export const isAuthenticated = rule()(async (parent, args, ctx: IGraphQLContext, info) => {
  if (ctx.user) {
    return true;
  } else {
    return new AuthenticationError('You are not authenticated. Try logging in.');
  }
});
