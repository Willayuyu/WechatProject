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
                        console.log(JSON.parse(bookString).data.author)
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
                                        // data: JSON.parse(bookString).data,
                                        data: {
                                            author: JSON.parse(bookString).data.author,
                                            category: '',
                                            cover_url: JSON.parse(bookString).data.cover_url,
                                            group: '',
                                            id: JSON.parse(bookString).data.id,
                                            isbn: JSON.parse(bookString).data.isbn,
                                            labels: '',
                                            publish: JSON.parse(bookString).data.publish,
                                            publishDate: JSON.parse(bookString).data.publishDate,
                                            status: '',
                                            title: JSON.parse(bookString).data.title,
                                            url: JSON.parse(bookString).data.url
                                        }
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
        //正则表达式验证是否为ISBN
        var reg = new RegExp("^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$");
        if (reg.test(value)) {
            const isbn = value
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
                    console.log(JSON.parse(bookString).data.author)
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
                                    // data: JSON.parse(bookString).data,
                                    data: {
                                        author: JSON.parse(bookString).data.author,
                                        category: '',
                                        cover_url: JSON.parse(bookString).data.cover_url,
                                        group: '',
                                        id: JSON.parse(bookString).data.id,
                                        isbn: JSON.parse(bookString).data.isbn,
                                        labels: '',
                                        publish: JSON.parse(bookString).data.publish,
                                        publishDate: JSON.parse(bookString).data.publishDate,
                                        status: '',
                                        title: JSON.parse(bookString).data.title,
                                        url: JSON.parse(bookString).data.url
                                    }
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

        } else {
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
                    // that.setData({
                    //     bookList: JSON.parse(bookString).data,
                    //     isSearchContent: true
                    // })
                    console.log(JSON.parse(bookString).data.length)
                    //云数据库初始化
                    const db = wx.cloud.database({});
                    const book = db.collection('books')
                    var detail = new Array();
                    for (let i = 0; i < JSON.parse(bookString).data.length; i++) {
                        console.log(JSON.parse(bookString).data[i].id)
                        if (JSON.parse(bookString).data[i].id) {
                            wx.cloud.callFunction({
                                // 要调用的云函数名称
                                name: 'searchID',
                                // 传递给云函数的参数
                                data: {
                                    id: JSON.parse(bookString).data[i].id
                                },
                                success: res => {
                                    console.log(res)
                                    var detailString = res.result;
                                    console.log(JSON.parse(detailString).data)
                                    detail.push(JSON.parse(detailString).data)
                                    console.log(detail)
                                    // that.setData({
                                    //     bookList: detail,
                                    //     isSearchContent: true
                                    // })
                                    db.collection('books').where({
                                        isbn: JSON.parse(detailString).data.isbn
                                    }).get({
                                        success: res => {
                                            if (res.data.length == 0) {
                                                db.collection('books').add({
                                                    // data 字段表示需新增的 JSON 数据
                                                    data: {
                                                        author: JSON.parse(detailString).data.author,
                                                        category: '',
                                                        cover_url: JSON.parse(detailString).data.cover_url,
                                                        group: '',
                                                        id: JSON.parse(detailString).data.id,
                                                        isbn: JSON.parse(detailString).data.isbn,
                                                        labels: '',
                                                        publish: JSON.parse(detailString).data.publish,
                                                        publishDate: JSON.parse(detailString).data.publishDate,
                                                        status: '',
                                                        title: JSON.parse(detailString).data.title,
                                                        url: JSON.parse(detailString).data.url
                                                    }
                                                }).then(res => {
                                                    console.log(res)
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                            } else {
                                                console.log("此书已存在！")
                                            }
                                        },
                                        fail: err => {
                                            console.error(res)
                                        }
                                    })
                                },
                                fail: err => {
                                    console.error(res)
                                }
                            })
                        }
                    }
                },
                fail: err => {
                    console.error(res)
                }
            })

        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this
        that.setData({
            bookList: app.globalData.bookList,
            isSearchISBN: app.globalData.isSearchISBN,
            isSearchContent: app.globalData.isSearchContent
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