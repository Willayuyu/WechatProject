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
        if (app.globalData.isLogin) {
            wx.navigateTo({
                url: '/pages/search/search',
            })
        } else {
            wx.showToast({
                title: '请先登录',
            })
        }
    },
    onShowDetail(e) {
        console.log(e.detail)
        db.collection('myBook').where({
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
                console.error(err)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        if (app.globalData.isLogin) {
            db.collection('myBook').where({
                _openid: app.globalData.openId,
            }).get({
                success: res => {
                    console.log(res.data)
                    that.setData({
                        defaultBook:res.data
                    })
                },
                fail: err => {
                    console.error(err)
                }
            })
            db.collection('myBook').where({
                _openid: app.globalData.openId,
                group:'文学'
            }).get({
                success: res => {
                    console.log(res.data)
                    that.setData({
                        book_1:res.data
                    })
                },
                fail: err => {
                    console.error(err)
                }
            })
            db.collection('myBook').where({
                _openid: app.globalData.openId,
                group:'流行'
            }).get({
                success: res => {
                    console.log(res.data)
                    that.setData({
                        book_2:res.data
                    })
                },
                fail: err => {
                    console.error(err)
                }
            })
            db.collection('myBook').where({
                _openid: app.globalData.openId,
                group:'文化'
            }).get({
                success: res => {
                    console.log(res.data)
                    that.setData({
                        book_3:res.data
                    })
                },
                fail: err => {
                    console.error(err)
                }
            })
            db.collection('myBook').where({
                _openid: app.globalData.openId,
                group:'生活'
            }).get({
                success: res => {
                    console.log(res.data)
                    that.setData({
                        book_4:res.data
                    })
                },
                fail: err => {
                    console.error(err)
                }
            })
            db.collection('myBook').where({
                _openid: app.globalData.openId,
                group:'经管'
            }).get({
                success: res => {
                    console.log(res.data)
                    that.setData({
                        book_5:res.data
                    })
                },
                fail: err => {
                    console.error(err)
                }
            })
            db.collection('myBook').where({
                _openid: app.globalData.openId,
                group:'科技'
            }).get({
                success: res => {
                    console.log(res.data)
                    that.setData({
                        book_6:res.data
                    })
                },
                fail: err => {
                    console.error(err)
                }
            })
        } else {
            that.setData({
                defaultBook: [],
                book_1: [],
                book_2: [],
                book_3: [],
                book_4: [],
                book_5: [],
                book_6: [],
            })
            wx.showToast({
                title: '请先登录',
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