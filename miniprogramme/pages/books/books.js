// pages/books/books.js
const db = wx.cloud.database()
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        list: [{
                pagePath: "/pages/index/index",
                iconPath: "/icons/index.png",
                selectedIconPath: "/icons/index-selected.png"
            },
            {
                pagePath: "/pages/books/books",
                iconPath: "/icons/book.png",
                selectedIconPath: "/icons/book-selected.png"
            },
            {
                pagePath: "/pages/add/add",
                iconPath: "/icons/add.png",
                selectedIconPath: ""
            },
            {
                pagePath: "/pages/records/records",
                iconPath: "/icons/record.png",
                selectedIconPath: "/icons/record-selected.png"
            },
            {
                pagePath: "/pages/mine/mine",
                iconPath: "/icons/mine.png",
                selectedIconPath: "/icons/mine-selected.png"
            }
        ],
        defaultBook: [],
        book_1: [],
        book_2: [],
        book_3: [],
        book_4: [],
        book_5: [],
        book_6: [],
    },

    changePage() {
        if (app.globalData.openId != '') {
            wx.navigateTo({
                url: '/pages/search/search',
            })
        }
        else{
            wx.showToast({
              title: '请先登录',
            })
            // wx.switchTab({
            //   url: '/pages/mine/mine',
            // })
        }
    },
    onShowDetail(e) {
        console.log(e.detail)
        if (app.globalData.openId != '') {
            db.collection('mybook').where({
                _openid: app.globalData.openId,
                isbn: e.detail.key
            }).get({
                success: res => {
                    console.log(res.data[0])
                    var bookList = encodeURIComponent(JSON.stringify(res.data[0]));
                    wx.navigateTo({
                        url: '/pages/detail/detail?bookList=' + bookList,
                    })
                },
                fail: err => {
                    console.error(res)
                }
            })
            // wx.navigateTo({
            //     url: '/pages/detail/detail',
            // })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var book_1 = new Array()
        var book_2 = new Array()
        var book_3 = new Array()
        var book_4 = new Array()
        var book_5 = new Array()
        var book_6 = new Array()
        if (app.globalData.openId != '') {
            db.collection('mybook').where({
                _openid: app.globalData.openId,
            }).get({
                success: res => {
                    console.log(res.data)
                    for (let i = 0; i < res.data.length; i++) {
                        for (let j = 0; j < res.data[i].group.length; j++) {
                            if (res.data[i].group[j] == '文化') {
                                book_1.push(res.data[i])
                            }
                            if (res.data[i].group[j] == '流行') {
                                book_2.push(res.data[i])
                            }
                            if (res.data[i].group[j] == '文化') {
                                book_3.push(res.data[i])
                            }
                            if (res.data[i].group[j] == '生活') {
                                book_4.push(res.data[i])
                            }
                            if (res.data[i].group[j] == '经管') {
                                book_5.push(res.data[i])
                            }
                            if (res.data[i].group[j] == '科技') {
                                book_6.push(res.data[i])
                            }
                        }
                    }
                    that.setData({
                        defaultBook: res.data,
                        book_1: book_1,
                        book_2: book_2,
                        book_3: book_3,
                        book_4: book_4,
                        book_5: book_5,
                        book_6: book_6,
                    })
                },
                fail: err => {
                    console.error(err)
                }
            })

        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.onLoad()

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})