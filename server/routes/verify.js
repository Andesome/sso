const Router = require('koa-router');
const config = require('../config/config');
const Models = require('../models');
const jwt = require('../lib/jwt');

const router = new Router({
  prefix: config.prefix,
});

const UserModel = Models.getModel('users');

router.get('verify', async (ctx) => {
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
    const user = await UserModel.findOne({ _id: payload.id }, { __v: 0, pwd: 0 });
    ctx.body = {
      code: 200,
      data: user,
      msg: '验证用户通过',
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
