const Koa = require('koa'); //搭建服务模块
const cors = require('@koa/cors'); //开启cors允许跨域
const logger = require('koa-logger'); //用于日志打印
const Router = require('@koa/router'); //koa路由，用于处理URL映射

const PORT = process.env.PORT || 3000; //设置监听接口

const app = new Koa(); //创建一个Koa对象表示web app本身:
const router = new Router();//创建路由

const {
    searchByText,
    getBookInfoById,
    getBookInfoByIsbn,
} = require('./douban');

/*
参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response。
由async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数。
*/
router.get('/', (ctx) => {
    ctx.body = 'hello!';
});

router.get('/search', async (ctx) => {
    const { text, update } = ctx.query;
    if (!text || text === '') {
        ctx.status = 400;
        ctx.body = {
            success: false,
            message: 'text is required.',
        };
    } else {
        try {
            const { result } = await searchByText(text, update === '1');
            ctx.body = {
                success: true,
                data: result,
            };
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                success: false,
                message: err,
            };
        }
    }
});

router.get('/book', async (ctx) => {
    const { id = '', isbn = '', update } = ctx.query;
    if (id === '' && isbn === '') {
        ctx.status = 400;
        ctx.body = {
            success: false,
            message: 'id or isbn is required.',
        };
    } else {
        try {
            const { info } = id === ''
                ? await getBookInfoByIsbn(isbn, update === '1')
                : await getBookInfoById(id, update === '1');
            ctx.body = {
                success: true,
                data: info,
            };
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                success: false,
                message: err,
            };
        }
    }
});


app
    .use(cors())
    .use(logger())
    .use(router.allowedMethods())
    .use(router.routes());

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));