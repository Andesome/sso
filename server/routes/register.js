const Router = require('koa-router');
const config = require('../config/config');
const Models = require('../models');

const router = new Router({
  prefix: config.prefix,
});

const UserModel = Models.getModel('users');

router.post('register', async (ctx) => {
  const userInfo = ctx.request.body;

  const user = new UserModel({ ...userInfo, create_time: new Date() });
  const res = await user.save();
  ctx.body = {
    code: 200,
    msg: '新增用户',
    data: res,
  };
});

module.exports = router;
