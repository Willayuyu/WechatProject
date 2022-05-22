const got = require('got');
const headers = require('./libs/getHeaders')();

//根据书名获取图书信息
async function getSearchResultFromOnline(text) {
    const response = await got('https://search.douban.com/book/subject_search?search_text=' + text, {
        method: 'GET',
        headers,
    });
    const result = /window\.__DATA__ = "(.*?)";/.exec(response.body)[1];
    return result.payload.items;
}

module.exports = {
    getSearchResultFromOnline
};
