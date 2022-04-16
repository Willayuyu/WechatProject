// pages/search/search.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookList: [],
        isSearchISBN: false,
        isSearchContent: false
    },

    onCreate() {
        wx.navigateTo({
            url: '/pages/new/new',
        })
    },

    onScan() {
        var that = this
        console.log(1)
        // 允许从相机和相册扫码
        wx.scanCode({
            onlyFromCamera: true,
            scanType: ['barCode'],
            success: res => {
                console.log(res.result)
                const isbn = res.result;
                wx.cloud.callFunction({
                    // 要调用的云函数名称
                    name: 'bookinfo',
                    // 传递给云函数的参数
                    data: {
                        isbn: isbn
                    },
                    success: res => {
                        console.log(res)
                        var bookString = res.result;
                        console.log(JSON.parse(bookString).data)
                        that.setData({
                            bookList: JSON.parse(bookString).data,
                            isSearchISBN: true
                        })
                        //云数据库初始化
                        const db = wx.cloud.database({});
                        const book = db.collection('books')
                        db.collection('books').where({
                            isbn: isbn
                        }).get({
                            success: res => {
                                if (res.data.length == 0) {
                                    db.collection('books').add({
                                        // data 字段表示需新增的 JSON 数据
                                        data: JSON.parse(bookString).data
                                    }).then(res => {
                                        console.log(res)
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                } else {
                                    console.log("此书已存在！")
                                }
                            }
                        })

                    },
                    fail: err => {
                        console.error(res)
                    }
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },

    onSearch: function (e) {
        var that = this
        console.log(e.detail.value)
        const value = encodeURI(e.detail.value)
        console.log(value)
        wx.cloud.callFunction({
            // 要调用的云函数名称
            name: 'search',
            // 传递给云函数的参数
            data: {
                value: value
            },
            success: res => {
                console.log(res)
                var bookString = res.result;
                console.log(JSON.parse(bookString).data)
                that.setData({
                    bookList: JSON.parse(bookString).data,
                    isSearchContent: true
                })
                console.log(JSON.parse(bookString).data.length)
                //云数据库初始化
                const db = wx.cloud.database({});
                const book = db.collection('books')
                for (let i = 0; i < JSON.parse(bookString).data.length; i++) {
                    db.collection('books').where({
                        id: JSON.parse(bookString).data[i].id
                    }).get({
                        success: res => {
                            if (res.data.length == 0) {
                                db.collection('books').add({
                                    // data 字段表示需新增的 JSON 数据
                                    data: JSON.parse(bookString).data[i]
                                }).then(res => {
                                    console.log(res)
                                }).catch(err => {
                                    console.log(err)
                                })
                            } else {
                                console.log("此书已存在！")
                            }
                        }
                    })
                }

            },
            fail: err => {
                console.error(res)
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this
        that.setData({
            bookList: app.globalData.bookList,
            isSearch: app.globalData.isSearch
        })
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