module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.8). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateTodo {
  count: Int!
}

type AggregateToken {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createTodo(data: TodoCreateInput!): Todo!
  updateTodo(data: TodoUpdateInput!, where: TodoWhereUniqueInput!): Todo
  updateManyTodoes(data: TodoUpdateManyMutationInput!, where: TodoWhereInput): BatchPayload!
  upsertTodo(where: TodoWhereUniqueInput!, create: TodoCreateInput!, update: TodoUpdateInput!): Todo!
  deleteTodo(where: TodoWhereUniqueInput!): Todo
  deleteManyTodoes(where: TodoWhereInput): BatchPayload!
  createToken(data: TokenCreateInput!): Token!
  updateToken(data: TokenUpdateInput!, where: TokenWhereUniqueInput!): Token
  updateManyTokens(data: TokenUpdateManyMutationInput!, where: TokenWhereInput): BatchPayload!
  upsertToken(where: TokenWhereUniqueInput!, create: TokenCreateInput!, update: TokenUpdateInput!): Token!
  deleteToken(where: TokenWhereUniqueInput!): Token
  deleteManyTokens(where: TokenWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  todo(where: TodoWhereUniqueInput!): Todo
  todoes(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Todo]!
  todoesConnection(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TodoConnection!
  token(where: TokenWhereUniqueInput!): Token
  tokens(where: TokenWhereInput, orderBy: TokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Token]!
  tokensConnection(where: TokenWhereInput, orderBy: TokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TokenConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum Role {
  ADMIN
  USER
  GUEST
  ROLEUPDATE
}

type Subscription {
  todo(where: TodoSubscriptionWhereInput): TodoSubscriptionPayload
  token(where: TokenSubscriptionWhereInput): TokenSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Todo {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  content: String!
  done: Boolean!
  user: User!
}

type TodoConnection {
  pageInfo: PageInfo!
  edges: [TodoEdge]!
  aggregate: AggregateTodo!
}

input TodoCreateInput {
  id: ID
  content: String!
  done: Boolean!
  user: UserCreateOneWithoutTodosInput!
}

input TodoCreateManyWithoutUserInput {
  create: [TodoCreateWithoutUserInput!]
  connect: [TodoWhereUniqueInput!]
}

input TodoCreateWithoutUserInput {
  id: ID
  content: String!
  done: Boolean!
}

type TodoEdge {
  node: Todo!
  cursor: String!
}

enum TodoOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  content_ASC
  content_DESC
  done_ASC
  done_DESC
}

type TodoPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  content: String!
  done: Boolean!
}

input TodoScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  done: Boolean
  done_not: Boolean
  AND: [TodoScalarWhereInput!]
  OR: [TodoScalarWhereInput!]
  NOT: [TodoScalarWhereInput!]
}

type TodoSubscriptionPayload {
  mutation: MutationType!
  node: Todo
  updatedFields: [String!]
  previousValues: TodoPreviousValues
}

input TodoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TodoWhereInput
  AND: [TodoSubscriptionWhereInput!]
  OR: [TodoSubscriptionWhereInput!]
  NOT: [TodoSubscriptionWhereInput!]
}

input TodoUpdateInput {
  content: String
  done: Boolean
  user: UserUpdateOneRequiredWithoutTodosInput
}

input TodoUpdateManyDataInput {
  content: String
  done: Boolean
}

input TodoUpdateManyMutationInput {
  content: String
  done: Boolean
}

input TodoUpdateManyWithoutUserInput {
  create: [TodoCreateWithoutUserInput!]
  delete: [TodoWhereUniqueInput!]
  connect: [TodoWhereUniqueInput!]
  set: [TodoWhereUniqueInput!]
  disconnect: [TodoWhereUniqueInput!]
  update: [TodoUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [TodoUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [TodoScalarWhereInput!]
  updateMany: [TodoUpdateManyWithWhereNestedInput!]
}

input TodoUpdateManyWithWhereNestedInput {
  where: TodoScalarWhereInput!
  data: TodoUpdateManyDataInput!
}

input TodoUpdateWithoutUserDataInput {
  content: String
  done: Boolean
}

input TodoUpdateWithWhereUniqueWithoutUserInput {
  where: TodoWhereUniqueInput!
  data: TodoUpdateWithoutUserDataInput!
}

input TodoUpsertWithWhereUniqueWithoutUserInput {
  where: TodoWhereUniqueInput!
  update: TodoUpdateWithoutUserDataInput!
  create: TodoCreateWithoutUserInput!
}

input TodoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  done: Boolean
  done_not: Boolean
  user: UserWhereInput
  AND: [TodoWhereInput!]
  OR: [TodoWhereInput!]
  NOT: [TodoWhereInput!]
}

input TodoWhereUniqueInput {
  id: ID
}

type Token {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  content: String!
  expiration: DateTime!
  user: User!
}

type TokenConnection {
  pageInfo: PageInfo!
  edges: [TokenEdge]!
  aggregate: AggregateToken!
}

input TokenCreateInput {
  id: ID
  content: String!
  expiration: DateTime!
  user: UserCreateOneWithoutTokensInput!
}

input TokenCreateManyWithoutUserInput {
  create: [TokenCreateWithoutUserInput!]
  connect: [TokenWhereUniqueInput!]
}

input TokenCreateWithoutUserInput {
  id: ID
  content: String!
  expiration: DateTime!
}

type TokenEdge {
  node: Token!
  cursor: String!
}

enum TokenOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  content_ASC
  content_DESC
  expiration_ASC
  expiration_DESC
}

type TokenPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  content: String!
  expiration: DateTime!
}

input TokenScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  expiration: DateTime
  expiration_not: DateTime
  expiration_in: [DateTime!]
  expiration_not_in: [DateTime!]
  expiration_lt: DateTime
  expiration_lte: DateTime
  expiration_gt: DateTime
  expiration_gte: DateTime
  AND: [TokenScalarWhereInput!]
  OR: [TokenScalarWhereInput!]
  NOT: [TokenScalarWhereInput!]
}

type TokenSubscriptionPayload {
  mutation: MutationType!
  node: Token
  updatedFields: [String!]
  previousValues: TokenPreviousValues
}

input TokenSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TokenWhereInput
  AND: [TokenSubscriptionWhereInput!]
  OR: [TokenSubscriptionWhereInput!]
  NOT: [TokenSubscriptionWhereInput!]
}

input TokenUpdateInput {
  content: String
  expiration: DateTime
  user: UserUpdateOneRequiredWithoutTokensInput
}

input TokenUpdateManyDataInput {
  content: String
  expiration: DateTime
}

input TokenUpdateManyMutationInput {
  content: String
  expiration: DateTime
}

input TokenUpdateManyWithoutUserInput {
  create: [TokenCreateWithoutUserInput!]
  delete: [TokenWhereUniqueInput!]
  connect: [TokenWhereUniqueInput!]
  set: [TokenWhereUniqueInput!]
  disconnect: [TokenWhereUniqueInput!]
  update: [TokenUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [TokenUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [TokenScalarWhereInput!]
  updateMany: [TokenUpdateManyWithWhereNestedInput!]
}

input TokenUpdateManyWithWhereNestedInput {
  where: TokenScalarWhereInput!
  data: TokenUpdateManyDataInput!
}

input TokenUpdateWithoutUserDataInput {
  content: String
  expiration: DateTime
}

input TokenUpdateWithWhereUniqueWithoutUserInput {
  where: TokenWhereUniqueInput!
  data: TokenUpdateWithoutUserDataInput!
}

input TokenUpsertWithWhereUniqueWithoutUserInput {
  where: TokenWhereUniqueInput!
  update: TokenUpdateWithoutUserDataInput!
  create: TokenCreateWithoutUserInput!
}

input TokenWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  expiration: DateTime
  expiration_not: DateTime
  expiration_in: [DateTime!]
  expiration_not_in: [DateTime!]
  expiration_lt: DateTime
  expiration_lte: DateTime
  expiration_gt: DateTime
  expiration_gte: DateTime
  user: UserWhereInput
  AND: [TokenWhereInput!]
  OR: [TokenWhereInput!]
  NOT: [TokenWhereInput!]
}

input TokenWhereUniqueInput {
  id: ID
  content: String
}

type User {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  username: String!
  password: String!
  roles: [Role!]!
  tokens(where: TokenWhereInput, orderBy: TokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Token!]
  todos(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Todo!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  username: String!
  password: String!
  roles: UserCreaterolesInput
  tokens: TokenCreateManyWithoutUserInput
  todos: TodoCreateManyWithoutUserInput
}

input UserCreateOneWithoutTodosInput {
  create: UserCreateWithoutTodosInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutTokensInput {
  create: UserCreateWithoutTokensInput
  connect: UserWhereUniqueInput
}

input UserCreaterolesInput {
  set: [Role!]
}

input UserCreateWithoutTodosInput {
  id: ID
  username: String!
  password: String!
  roles: UserCreaterolesInput
  tokens: TokenCreateManyWithoutUserInput
}

input UserCreateWithoutTokensInput {
  id: ID
  username: String!
  password: String!
  roles: UserCreaterolesInput
  todos: TodoCreateManyWithoutUserInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  username_ASC
  username_DESC
  password_ASC
  password_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  username: String!
  password: String!
  roles: [Role!]!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  username: String
  password: String
  roles: UserUpdaterolesInput
  tokens: TokenUpdateManyWithoutUserInput
  todos: TodoUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  username: String
  password: String
  roles: UserUpdaterolesInput
}

input UserUpdateOneRequiredWithoutTodosInput {
  create: UserCreateWithoutTodosInput
  update: UserUpdateWithoutTodosDataInput
  upsert: UserUpsertWithoutTodosInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutTokensInput {
  create: UserCreateWithoutTokensInput
  update: UserUpdateWithoutTokensDataInput
  upsert: UserUpsertWithoutTokensInput
  connect: UserWhereUniqueInput
}

input UserUpdaterolesInput {
  set: [Role!]
}

input UserUpdateWithoutTodosDataInput {
  username: String
  password: String
  roles: UserUpdaterolesInput
  tokens: TokenUpdateManyWithoutUserInput
}

input UserUpdateWithoutTokensDataInput {
  username: String
  password: String
  roles: UserUpdaterolesInput
  todos: TodoUpdateManyWithoutUserInput
}

input UserUpsertWithoutTodosInput {
  update: UserUpdateWithoutTodosDataInput!
  create: UserCreateWithoutTodosInput!
}

input UserUpsertWithoutTokensInput {
  update: UserUpdateWithoutTokensDataInput!
  create: UserCreateWithoutTokensInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  tokens_every: TokenWhereInput
  tokens_some: TokenWhereInput
  tokens_none: TokenWhereInput
  todos_every: TodoWhereInput
  todos_some: TodoWhereInput
  todos_none: TodoWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
}
`
      }
    