import { shield } from 'graphql-shield';
import { isAuthenticated } from './rules';

export const schemaPermissions = shield({
  Query: {
    me: isAuthenticated
  },
  Mutation: {
    addTodo: isAuthenticated,
    deleteTodo: isAuthenticated,
    updateTodo: isAuthenticated,
    toggleTodoStatus: isAuthenticated
  }
});
