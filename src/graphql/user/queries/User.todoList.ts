import { Todo } from '@app/models';
import { UserResolvers } from '@app/graphql-generated-schema';

const todoList: UserResolvers.TodoListResolver = async parent => {
  return Todo.query().where('ownerId', parent.id);
};

export default {
  User: {
    todoList
  }
};
