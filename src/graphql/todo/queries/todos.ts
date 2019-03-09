import { Todo } from '@app/models';
import { QueryResolvers } from '@app/graphql-generated-schema';

const todos: QueryResolvers.TodosResolver = async (parent, {}, {}) => {
  const allTodos = await Todo.query();

  return allTodos.map(todo => todo.getDto());
};

export default {
  todos
};
