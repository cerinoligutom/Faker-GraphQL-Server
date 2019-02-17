import { passwordService } from '@app/utils';
import { JsonSchema, RelationMappings } from 'objection';
import { Model } from './common/Model';
import { Todo } from './todo.model';

export class User extends Model {
  static tableName = 'users';

  firstName!: string;
  lastName!: string;
  username!: string;
  email!: string | null | undefined;
  avatarUrl!: string;
  createdAt!: string;
  updatedAt!: string;
  hash!: string;
  salt!: string;

  // Optional eager relations
  todos?: Todo[];

  getDto() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      avatarUrl: this.avatarUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  async $beforeInsert() {
    super.$beforeInsert();
    const salt = await passwordService.generateSalt();
    const hash = await passwordService.generateHash(this.hash, salt);

    this.hash = hash;
    this.salt = salt;
  }

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
      required: ['firstName', 'lastName', 'username', 'hash'],
      properties: {
        id: { type: 'string' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string' },
        username: { type: 'string' },
        hash: { type: 'string' },
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
