import { Todo } from '@app/models';
import { MutationResolvers } from '@app/graphql-generated-schema';

const deleteTodo: MutationResolvers.DeleteTodoResolver = async (
  parent,
  { id },
  { loaders }
) => {
  const deleteCount = await Todo.query().deleteById(id);

  if (deleteCount > 0) {
    await loaders.todoById.clear(id);
    return true;
  }
  return false;
};

export default {
  deleteTodo
};
