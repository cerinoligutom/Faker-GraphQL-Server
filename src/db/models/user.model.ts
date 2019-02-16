import { passwordService } from '@app/utils';
import { JsonSchema, RelationMappings } from 'objection';
import { Model } from './common/Model';
import { Todo } from './todo.model';

export class User extends Model {
  static tableName = 'users';

  firstName!: string;
  lastName!: string;
  username!: string;
  email!: string;
  avatarUrl!: string;
  createdAt!: Date;
  updatedAt!: Date;
  hash!: string;
  salt!: string;

  // Optional eager relations
  todos?: Todo[];

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

  async $beforeInsert() {
    const salt = await passwordService.generateSalt();
    const hash = await passwordService.generateHash(this.hash, salt);

    this.hash = hash;
    this.salt = salt;
  }

  // Table name is the only required property.

  // Methods can be defined for model classes just as you would for
  // any javascript class. If you want to include the result of these
  // method in the output json, see `virtualAttributes`.
  get fullName() {
    return [this.firstName, this.lastName].join(' ');
  }

  // Optional JSON schema. This is not the database schema!
  // Nothing is generated based on this. This is only used
  // for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // http://json-schema.org/.
  static get jsonSchema() {
    const schema: JsonSchema = {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'username', 'hash', 'salt'],
      properties: {
        id: { type: 'string' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string' },
        username: { type: 'string' },
        hash: { type: 'string' },
        salt: { type: 'string' }
      }
    };
    return schema;
  }

  static get relationMappings() {
    const mappings: RelationMappings = {
      todos: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: 'users.id',
          to: 'todos.ownerId'
        }
      }
    }
    return mappings;
  }
}
