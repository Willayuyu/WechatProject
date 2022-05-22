const { getSearchResultFromOnline } = require('./douban/search');
const {
    getBookInfoFromOnlineById,
    getBookInfoFromOnlineByIsbn,
} = require('./douban/book');

async function searchByText(text) {
    const result = await getSearchResultFromOnline(text);
    return { result };
}

async function getBookInfoById(douban_id) {
    const info = await getBookInfoFromOnlineById(douban_id);
    return { info };
}

async function getBookInfoByIsbn(isbn) {
    const info = await getBookInfoFromOnlineByIsbn(isbn);
    return { info };
}

module.exports = {
    searchByText,
    getBookInfoById,
    getBookInfoByIsbn,
};