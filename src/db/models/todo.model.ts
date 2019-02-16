import { JsonSchema, RelationMappings } from 'objection';
import { Model } from './common/Model';
import { User } from './user.model';

export class Todo extends Model {
  static tableName = 'todos';

  description!: string;
  isDone!: boolean;
  ownerId!: string;

  // Optional eager relations
  owner?: User;

  getDto() {
    return {
      id: this.id,
      isDone: this.isDone,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

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
