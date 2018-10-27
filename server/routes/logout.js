const Router = require('koa-router');
const config = require('../config/config');
const Models = require('../models');
const jwt = require('../lib/jwt');

const router = new Router({
  prefix: config.prefix,
});

const UserModel = Models.getModel('users');

router.get('logout', async (ctx) => {
  const { authorization } = ctx.request.headers;
  if (!authorization) {
    ctx.body = {
      code: 40004,
      msg: '你没有权限',
      data: null,
    };
    return;
  }
  const jwtResult = jwt.verifyJWT(authorization, config.JWT_SECRECT);
  if (jwtResult.isPass) {
    const { payload } = jwtResult;
    await UserModel.findOneAndUpdate({ _id: payload.id }, {
      $set: { last_logout: new Date() },
    });
    ctx.body = {
      code: 200,
      data: null,
      msg: '用户退出成功',
    };
  } else {
    ctx.body = {
      code: 40003,
      msg: '令牌无效',
      data: null,
    };
  }
});

module.exports = router;
