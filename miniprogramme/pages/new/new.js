// pages/new/new.js
const db = wx.cloud.database()
const app = getApp()
var util = require('../utils/utils.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        defaultImg: '/icons/book.png',
        bookImage: '',
        groups: [{
                id: 0,
                name: '文学',
                checked: false
            },
            {
                id: 1,
                name: '流行',
                checked: false
            },
            {
                id: 2,
                name: '文化',
                checked: false
            },
            {
                id: 3,
                name: '生活',
                checked: false
            },
            {
                id: 4,
                name: '经管',
                checked: false
            },
            {
                id: 5,
                name: '科技',
                checked: false
            },
        ],
        hiddenmodalput: false,

    },

    onChangeTap(e) {
        console.log(e.detail.current)
        var that = this
        that.setData({
            bookImage: e.detail.current
        })
    },

    change(e) {
        let groups = this.data.groups;
        groups.forEach(item => {
            if (item.name == e.detail.key) {
                item.checked = e.detail.checked;
            }
        });
        this.setData({
            groups: groups
        });
    },

    modalinput() {
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
    },

    submit: function (e) {
        const {
            detail
        } = e;
        var that = this
        console.log(detail.values)
        console.log(app.globalData.openId)
        console.log(that.data.bookImage)
        const bookData = detail.values
        console.log(bookData.group[0].value)
        console.log(util.formatTime(new Date()))

        const group = new Array()
        for (let i = 0; i < bookData.group.length; i++) {
            group.push(bookData.group[i].value)
        }
        console.log(group)
        db.collection('myBook').where({
            _openid: app.globalData.openId,
            isbn: bookData.isbn
        }).get({
            success: res => {
                if (res.data.length == 0) {
                    db.collection('myBook').add({
                        data: {
                            author: bookData.author,
                            category: bookData.category,
                            cover_url: that.data.bookImage,
                            group: group,
                            isbn: bookData.isbn,
                            publish: bookData.publish,
                            publishDate: bookData.publishDate,
                            status: bookData.status,
                            title: bookData.title,
                            url: bookData.url,
                            date: util.formatTime(new Date())
                        },
                        success: res => {
                            // wx.showToast({
                            //     title: '新增记录成功',
                            // })
                            console.log('[mybook] [新增记录] 成功，记录 _id: ', res._id)
                            // wx.navigateBack({
                            //     delta: 1,
                            // })
                            db.collection('books').add({
                                data: {
                                    author: bookData.author,
                                    cover_url: that.data.bookImage,
                                    isbn: bookData.isbn,
                                    publish: bookData.publish,
                                    publishDate: bookData.publishDate,
                                    status: bookData.status,
                                    title: bookData.title,
                                    date: util.formatTime(new Date())
                                },
                                success: res => {
                                    wx.showToast({
                                        title: '新增记录成功',
                                    })
                                    console.log('[read] [新增记录] 成功，记录 _id: ', res._id)
                                    wx.navigateBack({
                                        delta: 2,
                                    })
                                },
                                fail: err => {
                                    wx.showToast({
                                        title: '新增记录失败'
                                    })
                                    console.error('[read] [新增记录] 失败：', err)
                                    wx.navigateBack({
                                        delta: 2,
                                    })
                                }
                            })
                        },
                        fail: err => {
                            wx.showToast({
                                title: '新增记录失败'
                            })
                            console.error('[mybook] [新增记录] 失败：', err)
                            wx.navigateBack({
                                delta: 2,
                            })
                        }
                    })
                } else {
                    console.log('本书已加入书架')
                    wx.navigateBack({
                        delta: 1,
                    })
                }
            },
            fail: err => {
                console.log(err)
            }

        })

    },

    reset() {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.lin.initValidateForm(this)
        console.log(options.dataList)
        var dataTemp = decodeURIComponent(options.dataList); //函数可把字符串作为 URI 组件进行解码。
        var dataList = JSON.parse(dataTemp);
        console.log(dataList)
        this.setData({
            dataList: dataList,
            bookImage: dataList.cover_url
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