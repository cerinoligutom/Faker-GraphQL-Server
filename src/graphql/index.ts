import { env } from '@app/config/environment';
import { IGraphQLContext } from '@app/utils';
import { ApolloError, ApolloServer } from 'apollo-server-express';
import { Express, Request } from 'express';
import depthLimit from 'graphql-depth-limit';
import { graphQLRouter } from 'src/routes/graphql.routes';
import { initLoaders } from '../graphql-dataloaders';
import { schema } from './schema';

export const initApolloGraphqlServer = (app: Express) => {
  const server = new ApolloServer({
    schema,
    context: ({ req }: { req: Request }) => {
      const { user } = req;

      const graphqlContext: IGraphQLContext = {
        user,
        loaders: initLoaders()
      };

      return graphqlContext;
    },
    validationRules: [depthLimit(10)],
    formatError: (err: ApolloError) => {
      // https://www.apollographql.com/docs/apollo-server/features/errors.html#Masking-and-logging-errors

      // Do not send the exception details to the client when in production
      if (env.isProduction) {
        err.extensions!.exception = null;
      }

      return err;
    }
  });

  app.use(graphQLRouter);
  server.applyMiddleware({
    app
  });
};
