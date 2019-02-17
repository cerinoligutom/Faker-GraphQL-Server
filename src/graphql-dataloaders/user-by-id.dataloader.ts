import { User } from '@app/models';
import DataLoader from 'dataloader';
import _ from 'lodash';

export const userByIdLoader = () => {
  return new DataLoader(async (ids: string[]) => {
    const rows = await User.query().whereIn('id', ids);
    const users = rows.map(row => row.getDto());

    return ids.map(id => _.find(users, user => user.id === id) || null);
  });
};
