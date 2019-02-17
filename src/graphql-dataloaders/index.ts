import { ITodoDto, IUserDto } from '@app/models';
import DataLoader from 'dataloader';
import { todoByIdLoader } from './todo-by-id.dataloader';
import { userByIdLoader } from './user-by-id.dataloader';

export interface ILoaders {
  userById: DataLoader<string, IUserDto | null>;
  todoById: DataLoader<string, ITodoDto | null>;
}

export const initLoaders = () => {
  const loaders: ILoaders = {
    userById: userByIdLoader(),
    todoById: todoByIdLoader()
  };
  return loaders;
};
