import { Todo } from '@app/models';
import { UserResolvers } from 'typings/app-graphql-schema';

const todoList: UserResolvers.TodoListResolver = async parent => {
  return Todo.query().where('ownerId', parent.id);
};

export default {
  User: {
    todoList
  }
};
