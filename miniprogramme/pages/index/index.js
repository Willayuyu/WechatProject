// index.js
const app = getApp();
const db = wx.cloud.database({});
Page({
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
        noteNumber: '',
        bookNumber: '',
        recordNumber:'',
        readNumber:'',
        openId: '',
        noteList: [],
        bookList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        if (app.globalData.isLogin) {
            console.log(app.globalData.openId)
            db.collection("myNote").where({
                _openid: app.globalData.openId,
            }).get({
                success: res => {
                    console.log(res.data.length)
                    that.setData({
                        noteNumber: res.data.length,
                        noteList: res.data,
                    })
                },
                fail: err => {
                    console.error(err)
                }
            })
            // db.collection("notes").where({
            //     _openid: app.globalData.openId,
            // }).get({
            //     success: res => {
            //         console.log(res.data)
            //         console.log(res.data.length)
            //         that.setData({
            //             noteList: res.data,
            //             recordNumber:res.data.length
            //         })
            //     },
            //     fail: err => {
            //         console.error(err)
            //     }
            // })

            
            let n = 0
            db.collection("myBook").where({
                _openid: app.globalData.openId,
            }).get({
                success: res => {
                    console.log(res.data)
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].status == 0) {
                            res.data[i].status = '想读'
                        }
                        if (res.data[i].status == 1) {
                            res.data[i].status = '在读'
                        }
                        if (res.data[i].status == 2) {
                            n = n + 1
                            res.data[i].status = '读完'
                        }
                        if (res.data[i].status == 1) {
                            res.data[i].status = '弃读'
                        }
                    }
                    that.setData({
                        bookNumber: n,
                        // bookList: res.data,
                        // number: res.data.length
                    })
                    // console.log(that.data.bookNumber)
                },
                fail: err => {
                    console.error(err)
                }
            })
            db.collection("books").where({
                _openid: app.globalData.openId,
            }).get({
                success: res => {
                    console.log(res.data)
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].status == 0) {
                            res.data[i].status = '想读'
                        }
                        if (res.data[i].status == 1) {
                            res.data[i].status = '在读'
                        }
                        if (res.data[i].status == 2) {
                            res.data[i].status = '读完'
                        }
                        if (res.data[i].status == 1) {
                            res.data[i].status = '弃读'
                        }
                    }
                    that.setData({
                       bookList: res.data,
                       readNumber: res.data.length
                    })
                    // console.log(that.data.bookNumber)
                },
                fail: err => {
                    console.error(err)
                }
            })
        } else {
            that.setData({
                noteNumber: '',
                noteList: [],
                recordNumber:'',
                bookNumber: '',
                bookList: [],
                readNumber: ''
            })
            wx.showToast({
                title: '请先登录',
            })
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        var that = this
        that.onLoad()

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})