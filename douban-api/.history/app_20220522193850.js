const Koa = require('koa'); //搭建服务模块
const cors = require('@koa/cors'); //开启cors允许跨域
const logger = require('koa-logger'); //用于日志打印

const { router } = require('./router');

const PORT = process.env.PORT || 3000; //设置监听接口

const app = new Koa(); //创建一个Koa对象表示web app本身:

app
  .use(cors())
  .use(logger())
  .use(router.allowedMethods())
  .use(router.routes());

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));