export type Maybe<T> = T | null;

export interface IRegisterInput {
  firstName: string;

  lastName: string;

  username: string;

  email?: Maybe<string>;

  password: string;
}

// ====================================================
// Types
// ====================================================

export interface IQuery {
  _dummy?: Maybe<string>;

  todo?: Maybe<ITodo>;

  todos?: Maybe<(Maybe<ITodo>)[]>;

  me?: Maybe<IUser>;

  user?: Maybe<IUser>;

  users?: Maybe<(Maybe<IUser>)[]>;
}

export interface ITodo {
  id: string;

  isDone: boolean;

  description: string;

  createdAt: string;

  updatedAt: string;

  owner?: Maybe<IUser>;
}

export interface IUser {
  id: string;

  firstName: string;

  lastName: string;

  username: string;

  email?: Maybe<string>;

  avatarUrl: string;

  createdAt: string;

  updatedAt: string;

  todoList?: Maybe<(Maybe<ITodo>)[]>;
}

export interface IMutation {
  /** Returns JWT Token on a successful login */
  login: ILoginMutationResponse;

  register: IRegisterMutationResponse;

  _dummy?: Maybe<string>;

  addTodo: ITodo;

  deleteTodo: boolean;

  updateTodo: ITodo;

  toggleTodoStatus: ITodo;
}

export interface ILoginMutationResponse {
  token: string;
}

export interface IRegisterMutationResponse {
  success: boolean;
}

// ====================================================
// Arguments
// ====================================================

export interface ITodoQueryArgs {
  id: string;
}
export interface IUserQueryArgs {
  id: string;
}
export interface ILoginMutationArgs {
  username: string;

  password: string;
}
export interface IRegisterMutationArgs {
  input: IRegisterInput;
}
export interface IAddTodoMutationArgs {
  description: string;
}
export interface IDeleteTodoMutationArgs {
  id: string;
}
export interface IUpdateTodoMutationArgs {
  id: string;

  description: string;
}
export interface IToggleTodoStatusMutationArgs {
  id: string;
}

import { GraphQLResolveInfo } from "graphql";

import { IGraphQLContext } from "../utils/graphql/interfaces/IGraphQLContext";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = IGraphQLContext, TypeParent = {}> {
    _dummy?: _DummyResolver<Maybe<string>, TypeParent, Context>;

    todo?: TodoResolver<Maybe<ITodo>, TypeParent, Context>;

    todos?: TodosResolver<Maybe<(Maybe<ITodo>)[]>, TypeParent, Context>;

    me?: MeResolver<Maybe<IUser>, TypeParent, Context>;

    user?: UserResolver<Maybe<IUser>, TypeParent, Context>;

    users?: UsersResolver<Maybe<(Maybe<IUser>)[]>, TypeParent, Context>;
  }

  export type _DummyResolver<
    R = Maybe<string>,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type TodoResolver<
    R = Maybe<ITodo>,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context, TodoArgs>;
  export interface TodoArgs {
    id: string;
  }

  export type TodosResolver<
    R = Maybe<(Maybe<ITodo>)[]>,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type MeResolver<
    R = Maybe<IUser>,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = Maybe<IUser>,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context, UserArgs>;
  export interface UserArgs {
    id: string;
  }

  export type UsersResolver<
    R = Maybe<(Maybe<IUser>)[]>,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace TodoResolvers {
  export interface Resolvers<Context = IGraphQLContext, TypeParent = ITodo> {
    id?: IdResolver<string, TypeParent, Context>;

    isDone?: IsDoneResolver<boolean, TypeParent, Context>;

    description?: DescriptionResolver<string, TypeParent, Context>;

    createdAt?: CreatedAtResolver<string, TypeParent, Context>;

    updatedAt?: UpdatedAtResolver<string, TypeParent, Context>;

    owner?: OwnerResolver<Maybe<IUser>, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = ITodo,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type IsDoneResolver<
    R = boolean,
    Parent = ITodo,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type DescriptionResolver<
    R = string,
    Parent = ITodo,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = string,
    Parent = ITodo,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type UpdatedAtResolver<
    R = string,
    Parent = ITodo,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type OwnerResolver<
    R = Maybe<IUser>,
    Parent = ITodo,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = IGraphQLContext, TypeParent = IUser> {
    id?: IdResolver<string, TypeParent, Context>;

    firstName?: FirstNameResolver<string, TypeParent, Context>;

    lastName?: LastNameResolver<string, TypeParent, Context>;

    username?: UsernameResolver<string, TypeParent, Context>;

    email?: EmailResolver<Maybe<string>, TypeParent, Context>;

    avatarUrl?: AvatarUrlResolver<string, TypeParent, Context>;

    createdAt?: CreatedAtResolver<string, TypeParent, Context>;

    updatedAt?: UpdatedAtResolver<string, TypeParent, Context>;

    todoList?: TodoListResolver<Maybe<(Maybe<ITodo>)[]>, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = IUser,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type FirstNameResolver<
    R = string,
    Parent = IUser,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = string,
    Parent = IUser,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type UsernameResolver<
    R = string,
    Parent = IUser,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = Maybe<string>,
    Parent = IUser,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type AvatarUrlResolver<
    R = string,
    Parent = IUser,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = string,
    Parent = IUser,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type UpdatedAtResolver<
    R = string,
    Parent = IUser,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type TodoListResolver<
    R = Maybe<(Maybe<ITodo>)[]>,
    Parent = IUser,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = IGraphQLContext, TypeParent = {}> {
    /** Returns JWT Token on a successful login */
    login?: LoginResolver<ILoginMutationResponse, TypeParent, Context>;

    register?: RegisterResolver<IRegisterMutationResponse, TypeParent, Context>;

    _dummy?: _DummyResolver<Maybe<string>, TypeParent, Context>;

    addTodo?: AddTodoResolver<ITodo, TypeParent, Context>;

    deleteTodo?: DeleteTodoResolver<boolean, TypeParent, Context>;

    updateTodo?: UpdateTodoResolver<ITodo, TypeParent, Context>;

    toggleTodoStatus?: ToggleTodoStatusResolver<ITodo, TypeParent, Context>;
  }

  export type LoginResolver<
    R = ILoginMutationResponse,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context, LoginArgs>;
  export interface LoginArgs {
    username: string;

    password: string;
  }

  export type RegisterResolver<
    R = IRegisterMutationResponse,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context, RegisterArgs>;
  export interface RegisterArgs {
    input: IRegisterInput;
  }

  export type _DummyResolver<
    R = Maybe<string>,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
  export type AddTodoResolver<
    R = ITodo,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context, AddTodoArgs>;
  export interface AddTodoArgs {
    description: string;
  }

  export type DeleteTodoResolver<
    R = boolean,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context, DeleteTodoArgs>;
  export interface DeleteTodoArgs {
    id: string;
  }

  export type UpdateTodoResolver<
    R = ITodo,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context, UpdateTodoArgs>;
  export interface UpdateTodoArgs {
    id: string;

    description: string;
  }

  export type ToggleTodoStatusResolver<
    R = ITodo,
    Parent = {},
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context, ToggleTodoStatusArgs>;
  export interface ToggleTodoStatusArgs {
    id: string;
  }
}

export namespace LoginMutationResponseResolvers {
  export interface Resolvers<
    Context = IGraphQLContext,
    TypeParent = ILoginMutationResponse
  > {
    token?: TokenResolver<string, TypeParent, Context>;
  }

  export type TokenResolver<
    R = string,
    Parent = ILoginMutationResponse,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace RegisterMutationResponseResolvers {
  export interface Resolvers<
    Context = IGraphQLContext,
    TypeParent = IRegisterMutationResponse
  > {
    success?: SuccessResolver<boolean, TypeParent, Context>;
  }

  export type SuccessResolver<
    R = boolean,
    Parent = IRegisterMutationResponse,
    Context = IGraphQLContext
  > = Resolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  IGraphQLContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  IGraphQLContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  IGraphQLContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface IResolvers<Context = IGraphQLContext> {
  Query?: QueryResolvers.Resolvers<Context>;
  Todo?: TodoResolvers.Resolvers<Context>;
  User?: UserResolvers.Resolvers<Context>;
  Mutation?: MutationResolvers.Resolvers<Context>;
  LoginMutationResponse?: LoginMutationResponseResolvers.Resolvers<Context>;
  RegisterMutationResponse?: RegisterMutationResponseResolvers.Resolvers<
    Context
  >;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
