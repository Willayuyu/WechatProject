const cheerio = require('cheerio'); //解析请求结果

/*
移除字符串
*/
String.prototype.remove = function (...strs) { //...strs代表可变个数形参
    let _this = this;
    strs.forEach(str => {
        _this = _this.replace(new RegExp(str, 'g'), ''); //全局替换为空格
    });
    return _this;
};

/*
转换为数组
*/
function toArray(obj) {
    if (typeof obj === 'undefined') {
        return [];
    }
    if (Array.isArray(obj)) {
        return obj;
    } else {
        return [obj];
    }
}

/*
获取豆瓣链接
*/
function getLinkingData($) {
    const cheeioScriptJsonLinkingDataEleText = $('head>script[type="application/ld+json"]')[0]?.children[0]?.data || '{}';
    try {
        const linkingData = JSON.parse(cheeioScriptJsonLinkingDataEleText);
        const author = linkingData.author.map(item => item.name);
        const { name: title, url, isbn } = linkingData;
        return { title, url, isbn, author };
    } catch {
        return {};
    }
}

/*
获取豆瓣id
*/
function getId($) {
    console.log($('div#interest_sect_level.clearfix>a')[0].attribs.name.split('-'));//指定分隔符'-'将字符串拆分为数组
    return $('div#interest_sect_level.clearfix>a')[0].attribs.name.split('-')[1];
}

/*
获取图书标题
*/
function getTitle($) {
    return $('h1>span').text();
}

/*
获取图书信息
*/
function getInfo($) {
    const info = {};
    const infoEle = $('#info');
    const spanEles = [...infoEle.children('span')];
    spanEles.forEach(spanEle => {
        if (spanEle.children.length === 1) {
            info[spanEle.children[0].data.remove(':', ' ')] //获取名字并将':'替换为' '
                = spanEle.next.next.name === 'a' ? $(spanEle.next.next).text() : spanEle.next.data.slice(1);//如果标签名是a,则获取其内容。否则获取从第二个字符开始的所有字符的字符串，为了去掉前面的空格。
        } else {
            const children = spanEle.children.filter(ele => ele.name === 'span' || ele.name === 'a');
            info[children[0].children[0].data.remove(' ')] = children.slice(1).map(aEle => aEle.children[0].data);//获取作者名
        }
    });

    return info;
}

/*
获取图书封面链接
*/
function getCoverUrl($) {
    return $('div#mainpic>a.nbg')[0].attribs.href;
}

function parseHTML(html, id) {
    const $ = cheerio.load(html);
    const info = getInfo($);
    const linkingData = getLinkingData($);

    if (!id) {
        id = getId($);
    }
    return {
        title: getTitle($),
        subtitle: info.副标题 || '',
        original_title: info.原作名 || '',
        id,
        isbn: linkingData.isbn || info.ISBN || '',
        author: linkingData.author || [],
        translator: toArray(info.译者) || [],
        publish: info.出版社 || [],
        producer: info.出品方 || '',
        publishDate: info.出版年 || '',
        pages: info.页数 || 0,
        price: info.定价 || '',
        binging: info.装帧 || '',
        series: info.丛书 || '',
        cover_url: getCoverUrl($),
        url: `https://book.douban.com/subject/${id}/`,
    };
}

module.exports = parseHTML;
