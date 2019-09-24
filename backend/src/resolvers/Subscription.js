const { forwardTo } = require('prisma-binding');

const { checkAuthorizationSub } = require('../utils');

const Subscription = {
  user: {
    subscribe: async (parent, args, ctx, info) => {
      await checkAuthorizationSub(ctx, ['ADMIN', 'ROLEUPDATE']);
      return forwardTo('db')(parent, args, ctx, info);
    }
  },
  todo: {
    subscribe: async (parent, args, ctx, info) => {
      await checkAuthorizationSub(ctx, ['ADMIN', 'USER']);
      return forwardTo('db')(parent, args, ctx, info);
    }
  }
};

module.exports = Subscription;
