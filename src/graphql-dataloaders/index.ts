import { IUserDto } from '@app/models';
import DataLoader from 'dataloader';
import { userByIdLoader } from './user-by-id.dataloader';

export interface ILoaders {
  userById: DataLoader<string, IUserDto | null>;
}

export const initLoaders = () => {
  const loaders: ILoaders = {
    userById: userByIdLoader()
  };
  return loaders;
};
