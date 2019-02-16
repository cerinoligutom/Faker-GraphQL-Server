import { JsonSchema, RelationMappings } from 'objection';
import { Model } from './common/Model';
import { User } from './user.model';

export class Todo extends Model {
  static tableName = 'todos';

  description!: string;
  ownerId!: string;

  // Optional eager relations
  owner?: User;

  static get jsonSchema() {
    const schema: JsonSchema = {
      type: 'object',
      required: ['description', 'ownerId'],
      properties: {
        id: { type: 'string' },
        description: { type: 'string' },
        ownerId: { type: 'string' }
      }
    };
    return schema;
  }

  static get relationMappings() {
    const mappings: RelationMappings = {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'todos.ownerId',
          to: 'users.id'
        }
      }
    };
    return mappings;
  }
}
