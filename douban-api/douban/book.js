const got = require('got'); //http请求库
const headers = require('./libs/getHeaders')();
const parseHTML = require('./libs/parseHtml');

//根据豆瓣id获取图书信息
async function getBookInfoFromOnlineById(id) {
    const response = await got(`https://book.douban.com/subject/${id}/`, {
        method: 'GET',
        headers,
    });
    return parseHTML(response.body, id);
}

//根据豆瓣isbn获取图书信息
async function getBookInfoFromOnlineByIsbn(isbn) {
    const response = await got(`https://book.douban.com/isbn/${isbn}/`, {
        method: 'GET',
        headers,
    });
    return parseHTML(response.body);
}

module.exports = {
    getBookInfoFromOnlineById,
    getBookInfoFromOnlineByIsbn,
};