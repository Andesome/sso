const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const { PORT } = require('./config/config');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  const start = new Date();
  try {
    await next();
  } catch (e) {
    // console.log('统一处理错误', e);
    ctx.body = {
      code: 500,
      msg: e.message,
      errorObject: {
        message: e.message,
        name: e.name,
        stringValue: e.stringValue,
        kind: e.kind,
        value: e.value,
        path: e.path,
        reason: e.reason,
      },
    };
  }
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'accept, accept-encoding, authorization, content-type, dnt, origin, user-agent, x-csrftoken, x-requested-with',
  );
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
});

router.get('/', (ctx) => {
  ctx.body = 'haaaaaaaaaa';
});

app
  .use(koaBody({ strict: false, json: true }))
  .use(router.allowedMethods())
  .use(router.routes())
  .use(registerRoute.routes())
  .use(loginRoute.routes());

app.listen(PORT, () => {
  console.log(`app start on ${PORT}`);
});
