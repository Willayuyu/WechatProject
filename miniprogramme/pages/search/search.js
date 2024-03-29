// pages/search/search.js
const app = getApp()
const db = wx.cloud.database({});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookList: [],
        isSearchISBN: false,
        isSearchContent: false,
        searchValue: ''
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
            scanType: ['barCode'],
            success: res => {
                console.log(res.result)
                const isbn = res.result;
                wx.showLoading({
                    title: '搜索中...',
                })
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

                        db.collection('searchBook').where({
                            isbn: isbn
                        }).get({
                            success: res => {
                                console.log(res.data)
                                if (res.data.length == 0) {
                                    db.collection('searchBook').add({
                                        // data 字段表示需新增的 JSON 数据
                                        // data: JSON.parse(bookString).data,
                                        data: {
                                            author: JSON.parse(bookString).data.author,
                                            cover_url: JSON.parse(bookString).data.cover_url,
                                            id: JSON.parse(bookString).data.id,
                                            isbn: JSON.parse(bookString).data.isbn,
                                            publish: JSON.parse(bookString).data.publish,
                                            publishDate: JSON.parse(bookString).data.publishDate,
                                            title: JSON.parse(bookString).data.title,
                                            url: JSON.parse(bookString).data.url
                                        }
                                    }).then(res => {
                                        console.log(res)
                                        wx.hideLoading({
                                            success: (res) => {},
                                          })
                                    }).catch(err => {
                                        console.log(err)
                                        wx.hideLoading({
                                            success: (res) => {},
                                          })
                                    })
                                } else {
                                    console.log("此书已存在！")
                                    wx.hideLoading({
                                        success: (res) => {},
                                      })
                                }
                            }
                        })
                        wx.hideLoading({
                          success: (res) => {},
                        })
                    },
                    fail: err => {
                        console.error(err)
                        wx.hideLoading({
                          success: (res) => {},
                        })
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
        that.setData({
            searchValue: e.detail.value
        })
        const value = encodeURI(e.detail.value)
        console.log(value)
        //正则表达式验证是否为ISBN
        var reg = new RegExp("^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$");
        wx.showLoading({
            title: '搜索中...',
        })
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
                    //云数据库初始化
                    db.collection('searchBook').where({
                        isbn: isbn
                    }).get({
                        success: res => {
                            if (res.data.length == 0) {
                                db.collection('searchBook').add({
                                    // data 字段表示需新增的 JSON 数据
                                    // data: JSON.parse(bookString).data,
                                    data: {
                                        author: JSON.parse(bookString).data.author,
                                        cover_url: JSON.parse(bookString).data.cover_url,
                                        id: JSON.parse(bookString).data.id,
                                        isbn: JSON.parse(bookString).data.isbn,
                                        publish: JSON.parse(bookString).data.publish,
                                        publishDate: JSON.parse(bookString).data.publishDate,
                                        title: JSON.parse(bookString).data.title,
                                        url: JSON.parse(bookString).data.url
                                    }
                                }).then(res => {
                                    console.log(res)
                                    wx.hideLoading({
                                      success: (res) => {},
                                    })
                                }).catch(err => {
                                    console.log(err)
                                    wx.hideLoading({
                                      success: (res) => {},
                                    })
                                })
                            } else {
                                console.log("此书已存在！")
                                wx.hideLoading({
                                  success: (res) => {},
                                })
                            }
                        }
                    })
                },
                fail: err => {
                    console.error(err)
                    wx.hideLoading({
                        success: (res) => {},
                      })
                }
            })

        } 
        else {
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
                    console.log(JSON.parse(bookString).data.length)

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
                                    that.setData({
                                        bookList: detail,
                                        isSearchContent: true
                                    })
                                    db.collection('searchBook').where({
                                        isbn: JSON.parse(detailString).data.isbn
                                    }).get({
                                        success: res => {
                                            if (res.data.length == 0) {
                                                db.collection('searchBook').add({
                                                    // data 字段表示需新增的 JSON 数据
                                                    data: {
                                                        author: JSON.parse(detailString).data.author,
                                                        cover_url: JSON.parse(detailString).data.cover_url,
                                                        id: JSON.parse(detailString).data.id,
                                                        isbn: JSON.parse(detailString).data.isbn,
                                                        publish: JSON.parse(detailString).data.publish,
                                                        publishDate: JSON.parse(detailString).data.publishDate,
                                                        title: JSON.parse(detailString).data.title,
                                                        url: JSON.parse(detailString).data.url
                                                    }
                                                }).then(res => {
                                                    console.log(res)
                                                    wx.hideLoading({
                                                        success: (res) => {},
                                                      })
                                                }).catch(err => {
                                                    console.log(err)
                                                    wx.hideLoading({
                                                        success: (res) => {},
                                                      })
                                                })
                                            } else {
                                                console.log("此书已存在！")
                                                wx.hideLoading({
                                                    success: (res) => {},
                                                  })
                                            }
                                        },
                                        fail: err => {
                                            console.error(err)
                                            wx.hideLoading({
                                              success: (res) => {},
                                            })
                                        }
                                    })
                                },
                                fail: err => {
                                    console.error(err)
                                    wx.hideLoading({
                                        success: (res) => {},
                                      })
                                }
                            })
                        }
                    }

                },
                fail: err => {
                    console.error(err)
                    wx.hideLoading({
                        success: (res) => {},
                      })
                }
            })
        }
    },

    showDetail: function (e) {
        console.log(e.currentTarget.id)
        const db = wx.cloud.database({});
        db.collection('searchBook').where({
            isbn: e.currentTarget.id
        }).get({
            success: res => {
                console.log(res.data[0])
                var dataList = encodeURIComponent(JSON.stringify(res.data[0]));
                wx.navigateTo({
                    url: '/pages/new/new?dataList=' + dataList,
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
    onLoad(options) {
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