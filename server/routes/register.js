const Router = require('koa-router');
const config = require('../config/config');
const Models = require('../models');

const router = new Router({
  prefix: config.prefix,
});

const UserModel = Models.getModel('users');

router.post('register', async (ctx) => {
  const userInfo = ctx.request.body;

  console.log(typeof userInfo);
  const user = new UserModel({ ...userInfo, create_time: new Date() });
  const res = await user.save();
  ctx.body = {
    code: 200,
    msg: '新增用户',
    data: res,
  };
});

router.post('login', async (ctx) => {
  const userInfo = ctx.request.body;
  const { name } = userInfo;

  const res = await UserModel.findOne({ name }, { __v: 0 });
  ctx.set();
  ctx.body = {
    code: 200,
    msg: '查询用户',
    data: res,
  };
});

// test
router.get('test', async (ctx) => {
  ctx.redirect('https://www.baidu.com');
});

module.exports = router;