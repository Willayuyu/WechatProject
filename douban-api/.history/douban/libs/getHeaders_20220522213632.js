const faker = require('faker'); //faker生成虚拟测试数据

const getHeaders = () => ({
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',//浏览器能够接受的内容消息。
    'Accept-Encoding': 'gzip, deflate, br', //浏览器发给服务器,声明浏览器支持的编码类型。
    'Accept-Language': 'zh', //浏览器所支持的语言类型。
    'Connection': 'keep-alive',//开启长连接。
    'DNT': '1',
    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',//可以理解用来替代user-agent的，用sec-ch-ua可以防止泄露浏览器详细信息。
    'sec-ch-ua-mobile': '?0',//是否是移动端用户
    'Sec-Fetch-Dest': 'document',//表示请求的目的地，即如何使用获取的数据。
    'Sec-Fetch-Mode': 'navigate',//表明了一个请求的模式。
    'Sec-Fetch-Site': 'none',//请求发起者的来源与目标资源来源之间的关系。
    'Sec-Fetch-User': '?1',//取值是一个Bool类型的值，用户是主动还是被动请求，ture是主动，false被动。
    'Upgrade-Insecure-Requests': '1',//把所属本站的所有 http 连接升级为 https 连接。
    'User-Agent': faker.internet.userAgent() //UserAgent是识别浏览器的一串字符串，相当于浏览器的身份证，在利用爬虫爬取网站数据时，频繁更换UserAgent可以避免触发相应的反爬机制。
});

module.exports = getHeaders;