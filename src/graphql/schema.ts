import { makeExecutableSchema } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import { depthOfObject } from 'src/utils/depthOfObject';
import { schemaPermissions } from '../graphql-shield';

const getTypeDefs = () => {
  return fileLoader(path.join(__dirname, '**/*.graphql'));
};

const getQueries = () => {
  const loadedQueries = fileLoader(path.join(__dirname, '**/queries/*.ts'));
  return loadedQueries.map(query => {
    /*
      Note:
      This function is a utility for the merging process of resolvers.
      https://github.com/okgrow/merge-graphql-schemas#merging-resolvers

      Intention of this function is to remove the process of repeatedly wrapping
      the method implementation to a parent property named Query.
      From:
        export default {
          Query: {
            your_method
          }
        }
      To:
        export default {
          your_method
        }

      We get the object depth to determine if the query object
      is a parent Query (depth 1) or a field resolver (depth 2).

      If it's a parent query (queries that are extending type Query),
      we wrap the query object in a "Query" property.
        - Implementation example of a parent query:
          export default {
            user
          }

      Else, we return the query directly because it must be a field resolver
      and the parent Type of the field resolver is defined in the respective file.
        - Implementation example of a type field resolver:
          export default {
            User: {
              fullName
            }
          }

      See User.fullName.ts vs user.ts under user/queries for examples.
    */

    const objectDepth = depthOfObject(query);

    if (objectDepth === 1) {
      // Query object is extending type Query
      return { Query: query };
    }
    if (objectDepth === 2) {
      // Query object is a field resolver
      return query;
    }
    throw new Error('Query object cannot have a depth of other than 1 or 2.');
  });
};

const getMutations = () => {
  const loadedMutations = fileLoader(path.join(__dirname, '**/mutations/*.ts'));
  return loadedMutations.map(mutation => ({ Mutation: mutation }));
};

// Create Schema
const queries = getQueries();
const mutations = getMutations();

let resolvers = mergeResolvers([...queries, ...mutations]);
resolvers = { ...resolvers };
const typeDefs = mergeTypes(getTypeDefs());

let graphqlSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  // tslint:disable-next-line:no-console
  logger: { log: e => console.info(e) },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});

// Apply graphql-shield middleware
graphqlSchema = applyMiddleware(graphqlSchema, schemaPermissions);

export const schema = graphqlSchema;
