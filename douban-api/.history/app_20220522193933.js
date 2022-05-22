const Koa = require('koa'); //搭建服务模块
const cors = require('@koa/cors'); //开启cors允许跨域
const logger = require('koa-logger'); //用于日志打印
const Router = require('@koa/router'); //koa路由，用于处理URL映射

const { router } = require('./router');

const PORT = process.env.PORT || 3000; //设置监听接口

const app = new Koa(); //创建一个Koa对象表示web app本身:
const router = new Router();//创建路由

/*
参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response。
由async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数。
*/
router.get('/', (ctx) => {
  ctx.body = 'hello!';
});

app
  .use(cors())
  .use(logger())
  .use(router.allowedMethods())
  .use(router.routes());

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));