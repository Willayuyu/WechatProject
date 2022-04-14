# Douban Book Api for Calibre

坚决反对以豆瓣为首的生态封闭行为!

Resolutely oppose the ecological closure behavior led by Douban!

## 简介

这是一个使用爬虫实现的第三方豆瓣读书 api 接口. 本项目中没有任何数据, 请自行搭建. 鉴于豆瓣关闭 api 接口并封禁 apiKey, 爬虫有被风控的风险, 请控制好抓取频次.

## 安装

### Using Docker

```bash
sudo docker run -d \
--name douban-book-api-1 \
-p 3000:3000 \
-v /CACHE_DIR:/cache \
acdzh/douban-book-api-1
```

### Using node

```bash
npm install
node app.js
```

之后访问 `http://localhost:3000/` 即可.

## API 接口说明

### 图书搜索接口

#### 请求地址  

`{HOST}/search/<text>`  

#### 请求方式  

**GET**  

#### 请求参数  

##### Header 参数  

| 参数名       | 必选 | 类型/参数值      | 说明         |
| ------------ | ---- | ---------------- | ------------ |
| Content-Type | 是   | application/json | 请求参数类型 |

#### 返回示例

`{HOST}/search/刘慈欣`

```json
{
  "success": true,
  "data": [
    {
      "title": "刘慈欣 Cixin Liu",
      "abstract_2": "作者 / 1963-06-01 / 三体 / 三体Ⅱ / 三体Ⅲ",
      "labels": [],
      "url": "https://book.douban.com/author/4561353/",
      "id": 4561353,
      "abstract": "8693 人收藏",
      "cover_url": "https://img9.doubanio.com/view/celebrity/raw/public/p1543395922.04.jpg",
      "more_url": "",
      "tpl_name": "search_common"
    },
    {
      "id": 33146,
      "labels": [],
      "tpl_name": "search_simple",
      "abstract": "中国工人出版社 / 共3册",
      "title": "[丛书] 刘慈欣作品",
      "url": "https://book.douban.com/series/33146"
    },
    {
      "more_url": "onclick=\"moreurl(this,{i:'0',query:'%E5%88%98%E6%85%88%E6%AC%A3',subject_id:'2567698',from:'book_subject_search',cat_id:'1001'})\"",
      "url": "https://book.douban.com/subject/2567698/",
      "extra_actions": [
        {
          "url": "https://book.douban.com/subject/2567698/?channel=subject_list&platform=web",
          "color": "#CF5B40",
          "text": "豆瓣书店有售"
        }
      ],
      "labels": [],
      "label_actions": [],
      "rating": {
        "rating_info": "",
        "star_count": 4.5,
        "count": 410716,
        "value": 8.8
      },
      "cover_url": "https://img1.doubanio.com/view/subject/m/public/s2768378.jpg",
      "interest": null,
      "topics": [],
      "tpl_name": "search_subject",
      "title": "三体 : “地球往事”三部曲之一",
      "id": 2567698,
      "abstract": "刘慈欣 / 重庆出版社 / 2008-1 / 23.00",
      "abstract_2": ""
    },
    {
      "topics": [
        {
          "more_url": "onclick=\"moreurl(this,{query:'%E5%88%98%E6%85%88%E6%AC%A3',subject_id:'19226',from:'subject_search_topic'})\"",
          "url": "https://www.douban.com/gallery/topic/19226/",
          "label": "话题",
          "name": "在《三体》三部曲中，你最喜欢的人物是哪一个？",
          "abstract": "11274人浏览 · 6篇文章"
        },
        {
          "more_url": "onclick=\"moreurl(this,{query:'%E5%88%98%E6%85%88%E6%AC%A3',subject_id:'17836',from:'subject_search_topic'})\"",
          "url": "https://www.douban.com/gallery/topic/17836/",
          "label": "话题",
          "name": "《三体》系列中让你印象深刻的一句话？",
          "abstract": "7666人浏览 · 4篇文章"
        }
      ],
      "cover_url": "https://img9.doubanio.com/view/subject/m/public/s28357056.jpg",
      "title": "三体全集 : 地球往事三部曲",
      "interest": null,
      "label_actions": [],
      "extra_actions": [],
      "url": "https://book.douban.com/subject/6518605/",
      "abstract_2": "",
      "abstract": "刘慈欣 / 重庆出版社 / 2012-1-1 / 168.00元",
      "tpl_name": "search_subject",
      "rating": {
        "value": 9.4,
        "rating_info": "",
        "star_count": 4.5,
        "count": 103088
      },
      "id": 6518605,
      "labels": [],
      "more_url": "onclick=\"moreurl(this,{i:'1',query:'%E5%88%98%E6%85%88%E6%AC%A3',subject_id:'6518605',from:'book_subject_search',cat_id:'1001'})\""
    },
    {
      "labels": [],
      "rating": {
        "rating_info": "",
        "count": 242875,
        "value": 9.3,
        "star_count": 4.5
      },
      "more_url": "onclick=\"moreurl(this,{i:'2',query:'%E5%88%98%E6%85%88%E6%AC%A3',subject_id:'3066477',from:'book_subject_search',cat_id:'1001'})\"",
      "abstract": "刘慈欣 / 重庆出版社 / 2008-5 / 32.00",
      "title": "三体Ⅱ : 黑暗森林",
      "abstract_2": "",
      "extra_actions": [
        {
          "url": "https://book.douban.com/subject/3066477/?channel=subject_list&platform=web",
          "color": "#CF5B40",
          "text": "豆瓣书店有售"
        }
      ],
      "id": 3066477,
      "url": "https://book.douban.com/subject/3066477/",
      "label_actions": [],
      "interest": null,
      "cover_url": "https://img2.doubanio.com/view/subject/m/public/s3078482.jpg",
      "tpl_name": "search_subject",
      "topics": []
    },
  ],
  "is_cache": false
}
```

这个返回的结果对应 [https://search.douban.com/book/subject_search?search_text=刘慈欣](https://search.douban.com/book/subject_search?search_text=%E5%88%98%E6%85%88%E6%AC%A3), 见下图: 

![](./docs/search.png)


#### 备注

考虑到大部分的预期结果都出现在第一页, 所以搜索暂未设计翻页. 如果后续发现此需求确有必要, 会考虑升级.

### 根据豆瓣 id 获取图书详情

#### 请求地址  

`{HOST}/id/<id>`  

#### 请求方式  

**GET**  

#### 请求参数  

##### Header 参数  

| 参数名       | 必选 | 类型/参数值      | 说明         |
| ------------ | ---- | ---------------- | ------------ |
| Content-Type | 是   | application/json | 请求参数类型 |

#### 返回示例

`{HOST}/id/27012117`

```json
{
  "success": true,
  "data": {
    "title": "政治的逻辑",
    "subtitle": "马克思主义政治原理",
    "original_title": "",
    "id": "27012117",
    "isbn": "9787208140400",
    "author": [
      "王沪宁",
      "林尚立",
      "孙关宏"
    ],
    "translator": [],
    "publish": "上海人民出版社",
    "producer": "",
    "publishDate": "2016-10",
    "pages": "650",
    "price": "98.00元",
    "binging": "精装",
    "series": "",
    "book_intro": "《政治的逻辑》是高校社会科学尤其是政治学、行政学学科研究人士的重要参考书，是党政干部的首选学习马克思主义原理的必备参考书。《政治的逻辑》不仅仅是一本政治学著作，实际上也是一本研究马克思主义的理论著作。……从这个意义上讲，这本书的贡献是双重的。 作者王沪宁，复旦大学国际政治系国际政治专业毕业，研究生学历，法学硕士学位，教授，是现任中央政治局常委、中央书记处书记，中央政策研究室主任，中央全面深化改革领导小组办公室主任。",
    "author_intro": "王沪宁，复旦大学政治学教授，主要研究方向：政治学、中国政治。代表作：《政治的逻辑——马克思主义政治学原理》（与人合著，上海人民出版社2004年版）。1955年10月6日生于上海，籍贯山东掖县。1977年2月毕业于华东师范大学外语系法国语言文学专业，后去上海社会科学院从事自然辩证法研究。1978年9月考取复旦大学国际政治系硕士研究生，1981年7月获法学硕士学位，同年留校任教。复旦大学国际政治系国际政治专业毕业，研究生学历，法学硕士学位，教授。 作者王沪宁是现任中央政治局常委、中央书记处书记，中央政策研究室主任，中央全面深化改革领导小组办公室主任。",
    "catalog": [
      "序言",
      "写作说明",
      "第一章 导论：对象和地位",
      "第一节 马克思主义政治学的形成",
      "第二节 社会政治的基本构造",
      "第三节 马克思主义政治学方法论",
      "第二章 政治是经济的集中表现",
      "......",
      "第三节 政治平等升华到社会平等",
      "第四节 未来社会是自由人的联合体",
      "后记"
    ],
    "original_texts": [
      "阶级消亡首先必须消灭剥削阶级及其制度。但最终起决定作用的基本条件是生产力的高度发展。没有生产力的发展，不会有阶级的产生，也不会有阶级的消亡，这就是马克思主义关于阶级问题的基本结论。 ",
      "国家是表示：这个社会陷人了不可解决的自我矛盾，分裂为不可调和的对立面而又无力摆脱这些对立面。而为了使这些对立面，这些经济利益互相冲突的阶级，不致在无谓的斗争中把自己和社会消灭，就需要有一种表面上驾于社会之上的力量，这种力量应当缓和冲突，把冲突保持在秩序”的范围以内；这种从社会中产生但又自居于社会之上并且日益同社会脱离的力量，就是国家。” "
    ],
    "labels": [
      "政治学",
      "马克思主义",
      "王沪宁",
      "政治",
      "政治经济学",
      "马克思",
      "中国",
      "社会学"
    ],
    "cover_url": "https://img2.doubanio.com/view/subject/l/public/s29602841.jpg",
    "url": "https://book.douban.com/subject/27012117/",
    "rating": {
      "count": 176,
      "info": "",
      "value": 8.7,
      "five_star_pre": 53.4,
      "four_star_pre": 33,
      "three_star_pre": 8,
      "two_star_pre": 2.8,
      "one_star_pre": 2.8
    },
    "comments": [
      {
        "vote": 21,
        "user_name": "顾聿瑾",
        "user_page": "https://www.douban.com/people/stellariver/",
        "rating": 4,
        "date": "2017-11-11",
        "content": "越来越认识到政治学习的重要性。"
      },
      {
        "vote": 5,
        "user_name": "啦啦啦我",
        "user_page": "https://www.douban.com/people/132716393/",
        "rating": 1,
        "date": "2020-05-26",
        "content": "打四星五星的是从没有学过马克思主义政治学吗？"
      },
      {
        "vote": 2,
        "user_name": "YRZ212",
        "user_page": "https://www.douban.com/people/172994325/",
        "rating": 4,
        "date": "2019-10-20",
        "content": "希望把马克思主义政治学而不是马克思主义的政治学加以概括和凝结是必要的，只是这种合著最大的毛病就是前后重复或者前后重要概念不一致的理解。且，马克思主义政治学可以更加灵动。且，想再读一遍第五卷毛选，是六年级时候在邯郸小河街10块钱买的😄"
      },
      {
        "vote": 1,
        "user_name": "乔治 ♘",
        "user_page": "https://www.douban.com/people/165208204/",
        "rating": 4,
        "date": "2021-04-07",
        "content": "中国马克思主义的集大成学术精品，是当今中国政治制度的理论精粹，也是一切马克思主义中国化的政治学观点的来源，很伟大的一部著作，本身并不掺杂宣传与褒贬，就逻辑来将仍旧是十分严密的。"
      },
      {
        "vote": 2,
        "user_name": "向西向西",
        "user_page": "https://www.douban.com/people/147551043/",
        "rating": 4,
        "date": "2018-07-18",
        "content": "国师就是国师"
      },
      {
        "vote": 0,
        "user_name": "石浥子",
        "user_page": "https://www.douban.com/people/allzyoung/",
        "rating": 5,
        "date": "2021-08-15",
        "content": "系统性比较强，但是不同章节之间水准似有较大差异（和集体创作有关）。马恩列原文着实笔力千钧，放射着“思想的闪电”。"
      },
      {
        "vote": 0,
        "user_name": "不玩刀剑",
        "user_page": "https://www.douban.com/people/liamhero/",
        "rating": 4,
        "date": "2021-08-13",
        "content": "确实可以买一本随时翻一番。"
      },
      {
        "vote": 0,
        "user_name": "吉尔伽美什",
        "user_page": "https://www.douban.com/people/179756879/",
        "rating": 5,
        "date": "2021-08-06",
        "content": "读完后感觉被灌顶了，这本书是第一本我很想看第二遍第三遍的书。"
      },
      {
        "vote": 1,
        "user_name": "尋繹",
        "user_page": "https://www.douban.com/people/83264774/",
        "rating": 2,
        "date": "2021-07-13",
        "content": "陈腔滥调的八股文，内部人员的催眠剂"
      },
      {
        "vote": 0,
        "user_name": "清都山水郎",
        "user_page": "https://www.douban.com/people/232190382/",
        "rating": 5,
        "date": "2021-07-09",
        "content": "所有当代中国及历史的逻辑全体现了。看完，你对底层逻辑有一个基本性的了解。生产力就是一切，经济基础决定上层建筑，共产主义为何必定胜利。当代中国政策逻辑"
      }
    ],
    "reviews": [
      {
        "user_avator": "https://img1.doubanio.com/icon/u1566359-9.jpg",
        "user_name": "月之仙者",
        "user_page": "https://www.douban.com/people/yuezhixianzhe/",
        "rating": 3,
        "time": "2008-08-06 09:53:30",
        "publisher": "上海人民出版社2004版",
        "publisher_page": "https://book.douban.com/subject/1003659/",
        "title": "政治的逻辑：马克思主义政治学原理",
        "url": "https://book.douban.com/review/1463309/",
        "short_content": "经过十天左右的时间终于看完了厚厚的政治学著作---《政治的逻辑》，以前听说过这本书，知道它是复旦大学的考研参考书，也是北大多年以前的参考书，编者都是上海政治学界的知名人物，其中最著名的无疑就是王沪宁。本书的写作目的是为了弥补国内马克思主义政治学著作的空白，...",
        "usefull_count": 53,
        "useless_count": 2,
        "reply_count": 8
      },
      {
        "user_avator": "https://img2.doubanio.com/icon/u176380444-1.jpg",
        "user_name": "东风一号",
        "user_page": "https://www.douban.com/people/176380444/",
        "rating": 4,
        "time": "2018-04-27 00:35:23",
        "publisher": "上海人民出版社2004版",
        "publisher_page": "https://book.douban.com/subject/1003659/",
        "title": "王沪宁《政治的逻辑》读后感",
        "url": "https://book.douban.com/review/9320713/",
        "short_content": "花了十几天的时间终于把王沪宁的这本大作读完了。一开始读起来甚为枯燥，毕竟作为原理性的教科书大抵都是如此，形同嚼蜡。不过后面越看越过瘾。马克思主义政治学的精髓归结起来就是那么几条:政治是经济的集中表现，经济基础决定上层建筑，国家是阶级矛盾不可调和的产物，国家是...",
        "usefull_count": 16,
        "useless_count": 1,
        "reply_count": 2
      },
      {
        "user_avator": "https://img2.doubanio.com/icon/u6962312-2.jpg",
        "user_name": "土拨鼠",
        "user_page": "https://www.douban.com/people/6962312/",
        "rating": 5,
        "time": "2010-10-06 02:09:24",
        "publisher": "上海人民出版社2004版",
        "publisher_page": "https://book.douban.com/subject/1003659/",
        "title": "TG的政治逻辑",
        "url": "https://book.douban.com/review/3831738/",
        "short_content": "94年束缚还比较多，因此很多地方用词都比较正统，导致编者的水平没有完全展现出来。在王沪宁编写的书里面不算最好的，大部分内容是用政治学语言包装马克思主义政治哲学，没什么新意，但比起中学政治书要强上很多倍了。第十章还不错，是个亮点，围绕马克思和列宁的话做了展开...",
        "usefull_count": 6,
        "useless_count": 0,
        "reply_count": 0
      },
      {
        "user_avator": "https://img1.doubanio.com/icon/u1222088-218.jpg",
        "user_name": "子明",
        "user_page": "https://www.douban.com/people/wuziming/",
        "rating": 3,
        "time": "2007-09-18 16:51:36",
        "publisher": "上海人民出版社2004版",
        "publisher_page": "https://book.douban.com/subject/1003659/",
        "title": "事隔十年的等待",
        "url": "https://book.douban.com/review/1209874/",
        "short_content": "事隔十年的等待　　——评新版《政治的逻辑：马克思主义政治学原理》　　与《新政治学概要》的一版再版不同，《政治的逻辑：马克思主义政治学原理》（以下简称《政治的逻辑》）一书自1994年出版至今，隔了十年才于2004年9月再版。这是事隔了十年的等待，无论是对于读者，抑...",
        "usefull_count": 4,
        "useless_count": 0,
        "reply_count": 2
      },
      {
        "user_avator": "https://img1.doubanio.com/icon/user_normal.jpg",
        "user_name": "谢惊鸿",
        "user_page": "https://www.douban.com/people/54555622/",
        "rating": 5,
        "time": "2019-12-31 22:29:48",
        "publisher": "",
        "publisher_page": "",
        "title": "初读《政治的逻辑》：学习马克思主义，坚定政治立场",
        "url": "https://book.douban.com/review/12136241/",
        "short_content": "“”猪年读8本系列“的第8篇书评。这本书跟沙哈拉沙漠一样，都非常干，知识密度太大了。600多面，感觉面面都是要划重点，至少还得在花个半个月来好好读一下，所以今天只能是初读了。后面再补充修改并且给出思维导图。这是一本政治学的书，是近三十年前，一帮中国政治学的中坚...",
        "usefull_count": 3,
        "useless_count": 0,
        "reply_count": 1
      },
      {
        "user_avator": "https://img9.doubanio.com/icon/u177636934-4.jpg",
        "user_name": "噶哩哚",
        "user_page": "https://www.douban.com/people/177636934/",
        "rating": 4,
        "time": "2018-12-28 18:59:32",
        "publisher": "上海人民出版社2004版",
        "publisher_page": "https://book.douban.com/subject/1003659/",
        "title": "基本原理",
        "url": "https://book.douban.com/review/9855831/",
        "short_content": "1、政治是经济集中的表现；2、政治是各阶级之间的斗争；3、国家是阶级统治的工具；4、国家是从社会分化出来的管理机构；5、政治权力是阶级的权力；6、国家属性决定政治形式；7、政治民主是阶级统治；8、政治党派划分基于阶级划分；9、政治是一门科学和艺术；10、民族...",
        "usefull_count": 3,
        "useless_count": 0,
        "reply_count": 0
      },
      {
        "user_avator": "https://img2.doubanio.com/icon/u53528199-1.jpg",
        "user_name": "ruke87",
        "user_page": "https://www.douban.com/people/ruke87/",
        "rating": 5,
        "time": "2020-02-24 00:16:09",
        "publisher": "",
        "publisher_page": "",
        "title": "读的很畅快！",
        "url": "https://book.douban.com/review/12293501/",
        "short_content": "马列毛从中学时期就开始学，渐渐都忘差不多了，重拾此书，文中大量引用马列文献，厚厚一本，却比当年学生时期理解的透彻。书太厚，看过即忘，遂用铅笔标注，遇到觉得精彩的地方，或拍照或摘抄吧。书的内容读完了大概率会忘掉，但阅读时的畅快感觉还是很享受的。序言部分的基本...",
        "usefull_count": 1,
        "useless_count": 0,
        "reply_count": 0
      },
      {
        "user_avator": "https://img1.doubanio.com/icon/user_normal.jpg",
        "user_name": "人一己千",
        "user_page": "https://www.douban.com/people/202334918/",
        "rating": 5,
        "time": "2021-07-17 21:39:39",
        "publisher": "",
        "publisher_page": "",
        "title": "一本不错的马克思主义政治学的入门书",
        "url": "https://book.douban.com/review/13685284/",
        "short_content": "在过去的政治教育中总是零零碎碎地了解到一些马克思主义的原理，非常教条。而在这本书里可以比较系统地、完整地、有论证地去了解马克思主义政治学。全书处处充满了唯物辩证，以翔实的历史材料来印证说明原理。本书在许多方面刷新了我的认识，比如关于民主与权威，关于自由，关...",
        "usefull_count": 0,
        "useless_count": 0,
        "reply_count": 0
      },
      {
        "user_avator": "https://img2.doubanio.com/icon/u4687793-3.jpg",
        "user_name": "心中明了",
        "user_page": "https://www.douban.com/people/xinminger/",
        "rating": 5,
        "time": "2020-04-06 12:24:24",
        "publisher": "",
        "publisher_page": "",
        "title": "笔记",
        "url": "https://book.douban.com/review/12478124/",
        "short_content": "政治关系以一定的经济关系为基础，经济地位的变化，会产生改变政治地位的诉求。政治关系是阶级关系的体现，政治关系以一定的经济关系为基础。人是社会性动物，体现在人们为了生存必须进行物质生产活动，为了进行生产活动，必然要结成一定形式的社会。农村公社制度是东方专制...",
        "usefull_count": 0,
        "useless_count": 0,
        "reply_count": 0
      }
    ],
    "notes": []
  },
  "is_cache": false
}
```

这个返回的结果对应 [https://book.douban.com/subject/27012117/](https://book.douban.com/subject/27012117/), 见下图: 

![](./docs/id.png)


#### 备注

具体的数据返回格式会面会进行说明.

### 根据 isbn 获取图书详情

#### 请求地址  

`{HOST}/isbn/<isbn>`  

#### 请求方式  

**GET**  

#### 请求参数  

##### Header 参数  

| 参数名       | 必选 | 类型/参数值      | 说明         |
| ------------ | ---- | ---------------- | ------------ |
| Content-Type | 是   | application/json | 请求参数类型 |

#### 返回示例

`{HOST}/isbn/9787208140400`

返回同 `根据豆瓣 id 获取图书详情` 的示例

#### 备注

具体的数据返回格式会面会进行说明.

## 数据格式

|首级标签|次级标签|三级标签|名称|类型|示例|备注|
|------|-------|-------|---|---|---|---|
|title|||标题|string|"政治的逻辑"||
|subtitle|||副标题|string|"马克思主义政治原理"||
|original_title|||原标题|string||适用于译著|
|id|||豆瓣 id|string|"27012117"||
|author|||作者|string[]|["王沪宁", "林尚立", "孙关宏"]|顺序与豆瓣页面一致, 不进行排序|
|translator|||译者|string[]|[]|顺序与豆瓣页面一致, 不进行排序|
|publish|||出版社|string|"上海人民出版社"||
|producer|||出品方|string|""||
|publishDate|||出版年|string|"2016-10"||
|pages|||页数|string|"650"||
|price|||定价|string|"98.00元"||
|binging|||装帧|string|"精装"||
|series|||丛书|string|""||
|book_intro|||内容简介|string|"《政治的逻辑》是高校社会科学尤其是政治学、行政学学科研究人士的重要参考书，是党政干部的首选学习马克思主义原理的必备参考书..."||
|author_intro|||作者简介|string|"王沪宁，复旦大学政治学教授，主要研究方向：政治学、中国政治。代表作：《政治的逻辑——马克思主义政治学原理》（与人合著，上海人民出版社2004年版）..."||
|catalog|||目录|string[]|["序言","写作说明","第一章 导论：对象和地位","第一节 马克思主义政治学的形成","第二节 社会政治的基本构造", "..."]||
|original_texts|||原文摘录|string[]|["阶级消亡首先必须消灭剥削阶级及其制度。但最终起决定作用的基本条件是生产力的高度...", "国家是表示：这个社会陷人了不可解决的自我矛盾，分裂为不可调和的...", "..."]||
|labels|||标签|string[]|["政治学","马克思主义","王沪宁","政治","政治经济学","马克思","中国","社会学"]||
|cover_url|||封面地址|string|"https://img2.doubanio.com/view/subject/l/public/s29602841.jpg"|![](https://img2.doubanio.com/view/subject/l/public/s29602841.jpg)|
|url|||豆瓣页面地址|string|"https://book.douban.com/subject/27012117/"|[政治的逻辑 (豆瓣)](https://book.douban.com/subject/27012117/)|
|rating|||豆瓣评分|object|||
||count||评分人数|number|176||
||info||评分信息| "" \| "目前无人评价" \| "评价人数不足"|""|当评分不足时, 此项不为空|
||value||分数|number|8.7||
||five_star_pre||五星占比|number|53.4|百分数|
||four_star_pre||四星占比|number|33|百分数|
||three_star_pre||三星占比|number|8|百分数|
||two_star_pre||二星占比|number|2.8|百分数|
||one_star_pre||一行占比|number|2.8|百分数|
|comments|||短评|object[]||该项为数组, 包括最新短评与热门短评, 短评有字数限制|
||vote||有用数|number|1||
||user_name||用户昵称|string|"乔治 ♘"||
||user_page||用户主页|string|"https://www.douban.com/people/165208204/"|[乔治 ♘](https://www.douban.com/people/165208204/)|
||rating||评分|number|4||
||date||日期|string|"2021-04-07"||
||content||内容|string|"中国马克思主义的集大成学术精品，是当今中国政治制度的理论精粹，也是一切马克思主义中国化的政治学观点的来源，很伟大的一部著作，本身并不掺杂宣传与褒贬，就逻辑来将仍旧是十分严密的。"||
|reviews|||书评|object[]||此项为数组, 包含热门书评与最新书评|
||user_avator||用户头像|string|"https://img2.doubanio.com/icon/u176380444-1.jpg"|![](https://img2.doubanio.com/icon/u176380444-1.jpg)|
||user_name||用户昵称|string|"东风一号"||
||user_page||用户主页|string|"https://www.douban.com/people/176380444/"|[东风一号](https://www.douban.com/people/176380444/)|
||rating||评分|number|4||
||time||日期|string|"2018-04-27 00:35:23"||
||publisher||版本|string|"上海人民出版社2004版"|同一本书不同版本下的书评, 如果该项为空, 则说明用户所读的是当前版本|
||publisher_page||对应版本页面|string|"https://book.douban.com/subject/1003659/"|[政治的逻辑 (豆瓣)](https://book.douban.com/subject/1003659/)|
||title||标题|string|"王沪宁《政治的逻辑》读后感"||
||url||书评链接|string|"https://book.douban.com/review/9320713/"|[王沪宁《政治的逻辑》读后感（政治的逻辑）书评](https://book.douban.com/review/9320713/)|
||short_content||书评摘要|string|"花了十几天的时间终于把王沪宁的这本大作读完了。一开始读起来甚为枯燥，毕竟作为原理性的教科书大抵都是如此，形同嚼蜡。不过后面越看越过瘾。马克思主义政治学的精髓归结起来就是那么几条:政治是经济的集中表现，经济基础决定上层建筑，国家是阶级矛盾不可调和的产物，国家是..."||
||usefull_count||有用数|number|16||
||useless_count||没用数|number|1||
||reply_count||回应数|number|2||
|notes|||读书笔记|object[]||开发中...|
|discussion|||论坛|object[]||开发中...|

## 缓存

查询会强制写缓存. 缓存文件夹路径由环境变量 `CACHE_DIR` 决定, 缺省情况下是 `./.cache`, docker 中该路径为 `/cache`, 其结构如下所示:

```bash
/cache
├─html                            // 存放抓取的原始 html 数据
│  ├─id
│  │      1102870.html
│  │      1102871.html
│  │      27012117.html
│  │      35489958.html
│  │      4510627.html
│  │
│  └─isbn
│          9780613130462.html
│          9787208140400.html
│          9787506323864.html
│          9787506325295.html
│          9787536094154.html
│
├─info                           // 存放解析后的数据
│  ├─id                          // 图书 json 数据
│  │      1102870.json
│  │      1102871.json
│  │      35489958.json
│  │      4510627.json
│  │
│  └─isbn                        // isbn -> douban id 对应关系
│          9780613130462.txt
│          9787506325296.txt
│          9787506325297.txt
│          9787536094154.txt
│
└─search                         // 搜索记录 json 数据
        刘慈欣.json
        超新星纪元.json
        骆驼.json
```

默认会先从缓存中查询, 如果需要最新数据可以指定 api 参数 `update=1`.

## 油猴脚本

[自动刷新豆瓣图书 api 缓存 @Greasy Fork](https://greasyfork.org/zh-CN/scripts/431582)

这个脚本可以在浏览豆瓣时自动提交图书信息. 第一次使用需要先设置 api 服务器地址.

## 其他

本项目最终目的是为 [Calibre](https://calibre-ebook.com/) 插件所服务, 对应插件仍在开发中, 因此除非 Calibre 所需, 不会增加新功能.

因为是通过抓取 html 页面来获取数据, 因此抓取较慢且有一定概率遭到反爬测率限制或数据解析失败. 如果解析规则失效或解析数据有误, 请提 issure 或 pr, 谢谢茄子🍆.
