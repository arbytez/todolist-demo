const { forwardTo } = require('prisma-binding');

const { prisma } = require('../generated/prisma-client');
const { checkAuthorization, getCookieFromReq } = require('../utils');

const Query = {
  async me(parent, args, ctx, info) {
    if (!ctx.req || !ctx.req.userId) {
      return null;
    }
    const user = await prisma.user({ id: ctx.req.userId });
    const token = getCookieFromReq(ctx.req, 'token');
    return { user, token };
  },
  async users(parent, args, ctx, info) {
    checkAuthorization(ctx, ['ADMIN', 'ROLEUPDATE']);
    return forwardTo('db')(parent, args, ctx, info);
  },
  todoes: forwardTo('db'),
  todoesConnection: forwardTo('db')
};

module.exports = Query;
