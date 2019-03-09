import { Todo } from '@app/models';
import { MutationResolvers } from '@app/graphql-generated-schema';

const addTodo: MutationResolvers.AddTodoResolver = async (
  parent,
  { description },
  { user }
) => {
  return Todo.query().insertAndFetch({
    description,
    ownerId: user.id
  });
};

export default {
  addTodo
};
