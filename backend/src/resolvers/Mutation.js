const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const { forwardTo } = require('prisma-binding');

const { prisma } = require('../generated/prisma-client');
const {
  checkAuthorization,
  getCookieFromReq,
  generateToken
} = require('../utils');

const Mutation = {
  async signIn(parent, args, ctx, info) {
    const { username, password } = args;
    const user = await prisma.user({ username });
    if (!user) {
      throw new AuthenticationError('Invalid credentials!');
    }
    // Check if password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError('Invalid credentials!');
    }
    const token = await generateToken(ctx, user);
    return { user, token };
  },
  async signOut(parent, args, ctx, info) {
    // delete token from server
    const token = getCookieFromReq(ctx.req, 'token');
    if (token) {
      await prisma.deleteToken({ content: token });
    }
    // delete token from client
    ctx.req.res.clearCookie('token');
    return true;
  },
  async signUp(parent, args, ctx, info) {
    let { username, password } = args;
    if (!username || !password) {
      throw new AuthenticationError('Invalid credentials!');
    }
    if (username.length < 3 || username.length > 20) {
      throw new AuthenticationError(
        'Username length must be between 3 and 20!'
      );
    }
    if (password.length < 3 || password.length > 20) {
      throw new AuthenticationError(
        'Password length must be between 3 and 20!'
      );
    }
    password = await bcrypt.hash(args.password, 10);
    const user = await prisma.createUser({
      ...args,
      password,
      roles: { set: ['USER'] }
    });
    const token = await generateToken(ctx, user);
    return { user, token };
  },
  async createTodo(parent, args, ctx, info) {
    checkAuthorization(ctx, ['ADMIN', 'USER']);
    // check todo input data and that the todo user connection is the same as the logged user
    const { data: argsData } = args;
    if (!argsData) {
      throw new Error('Invalid Todo data!');
    }
    const { content, user } = argsData;
    if (
      !content ||
      !user ||
      !user.connect ||
      !user.connect.username ||
      ctx.req.user.username !== user.connect.username
    ) {
      throw new Error('Invalid Todo data!');
    }
    // check content length
    if (content.length > 200) {
      throw new Error('Todo content too long!');
    }
    // check max todos limit
    const totalTodos = await prisma
      .todoesConnection()
      .aggregate()
      .count();
    if (+process.env.MAX_TODOS < totalTodos + 1) {
      throw new Error('Todos number limit reached!');
    }
    return forwardTo('db')(parent, args, ctx, info);
  },
  async updateTodo(parent, args, ctx, info) {
    checkAuthorization(ctx, ['ADMIN', 'USER']);
    const { where: whereData, data: dataData } = args;
    if (!whereData || !dataData) {
      throw new Error('Invalid Todo data!');
    }
    const { content } = dataData;
    if (!content) {
      throw new Error('Invalid Todo data!');
    }
    // check content length
    if (content.length > 200) {
      throw new Error('Todo content too long!');
    }
    const { id } = whereData;
    // admin or todo onwer can update it
    const todoOwner = await prisma.todo({ id }).user();
    if (
      ctx.req.user.id !== todoOwner.id &&
      !ctx.req.user.roles.includes('ADMIN')
    ) {
      throw new Error('You are not the todo owner!');
    }
    return forwardTo('db')(parent, args, ctx, info);
  },
  async deleteTodo(parent, args, ctx, info) {
    checkAuthorization(ctx, ['ADMIN', 'USER']);
    const { where: argsData } = args;
    if (!argsData) {
      throw new Error('Invalid Todo data!');
    }
    const { id } = argsData;
    // admin or todo onwer can delete it
    const todoOwner = await prisma.todo({ id }).user();
    if (
      ctx.req.user.id !== todoOwner.id &&
      !ctx.req.user.roles.includes('ADMIN')
    ) {
      throw new Error('You are not the todo owner!');
    }
    return forwardTo('db')(parent, args, ctx, info);
  }
};

module.exports = Mutation;
