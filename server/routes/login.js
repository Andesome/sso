const Router = require('koa-router');
const config = require('../config/config');
const Models = require('../models');
const jwt = require('../lib/jwt');

const router = new Router({
  prefix: config.prefix,
});

const UserModel = Models.getModel('users');

router.post('login', async (ctx) => {
  const userInfo = ctx.request.body;
  const UA = ctx.request.headers['user-agent'];
  const { account, pwd } = userInfo;

  const res = await UserModel.findOneAndUpdate(
    { $or: [{ name: account }, { email: account }] },
    {
      $set: { last_login: new Date(), last_ua: UA },
    },
    { __v: 0 },
  );
  if (!res) {
    // 用户不存在
    ctx.body = {
      code: 40007,
      msg: '用户不存在',
      data: null,
    };
    return;
  }
  if (res.pwd !== pwd) {
    // 用户密码错误
    ctx.body = {
      code: 40005,
      msg: '密码错误',
      data: null,
    };
    return;
  }

  ctx.set('Access-Control-Expose-Headers', 'Authorization');
  ctx.set('Authorization', jwt.generateJWT({ id: res._id, name: res.name }, config.JWT_SECRECT));
  ctx.body = {
    code: 200,
    msg: '登录成功',
    data: { id: res._id, name: res.name, create_time: res.create_time },
  };
});

module.exports = router;
