import { User } from '@app/models';
import { ILoaders } from 'src/graphql-dataloaders';

export interface IGraphQLContext {
  user: User;
  loaders: ILoaders;
}
