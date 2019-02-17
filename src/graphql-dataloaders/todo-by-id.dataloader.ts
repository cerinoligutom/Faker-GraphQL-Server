import { Todo } from '@app/models';
import DataLoader from 'dataloader';
import _ from 'lodash';

export const todoByIdLoader = () => {
  return new DataLoader(async (ids: string[]) => {
    const rows = await Todo.query().whereIn('id', ids);
    const todos = rows.map(row => row.getDto());

    return ids.map(id => _.find(todos, todo => todo.id === id) || null);
  });
};
