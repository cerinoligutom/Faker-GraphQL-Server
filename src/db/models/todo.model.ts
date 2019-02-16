import { JsonSchema, RelationMappings } from 'objection';
import { Model } from './common/Model';
import { User } from './user.model';

export class Todo extends Model {
  static tableName = 'todos';

  description!: string;
  ownerId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // Optional eager relations
  owner?: User;

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

  static get jsonSchema() {
    const schema: JsonSchema = {
      type: 'object',
      required: ['createdBy', 'ownerId'],
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
