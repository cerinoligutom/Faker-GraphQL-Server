import { IGraphQLContext } from '@app/utils';
import { AuthenticationError } from 'apollo-server-express';
import { rule } from 'graphql-shield';

export const isAuthenticated = rule()(
  async (parent, args, ctx: IGraphQLContext, info) => {
    if (ctx.user) {
      return true;
    }
    return new AuthenticationError(
      'You are not authenticated. Try logging in.'
    );
  }
);
