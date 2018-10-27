const Router = require('koa-router');
const config = require('../config/config');
const Models = require('../models');
const jwt = require('../lib/jwt');

const PASSWORD = 'liaolunling';

const router = new Router({
  prefix: config.prefix,
});

const UserModel = Models.getModel('users');

router.post('login', async (ctx) => {
  const userInfo = ctx.request.body;
  const { account, pwd } = userInfo;

  const res = await UserModel.findOne({ $or: [{ name: account }, { email: account }] }, { __v: 0 });
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
  ctx.set('Authorization', jwt.generateJWT({ id: res._id, name: res.name }, PASSWORD));
  ctx.body = {
    code: 200,
    msg: '登录成功',
    data: { id: res._id, name: res.name, create_time: res.create_time },
  };
});

module.exports = router;
