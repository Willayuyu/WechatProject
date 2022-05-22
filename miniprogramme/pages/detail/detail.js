// pages/detail/detail.js
const app = getApp();
const db = wx.cloud.database({});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        userInfo: '',
        number: '',
        noteList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        let userInfo = app.globalData.userInfo
        console.log(userInfo)
        var dataTemp = decodeURIComponent(options.bookList); //函数可把字符串作为 URI 组件进行解码。
        var dataList = JSON.parse(dataTemp);
        console.log(dataList)
        that.setData({
            dataList: dataList,
            userInfo: userInfo,
        })

        db.collection("myNote").where({
            _openid: app.globalData.openId,
            isbn: dataList.isbn
        }).get({
            success: res => {
                console.log(res.data)
                console.log(res.data.length)
                that.setData({
                    number: res.data.length,
                    noteList: res.data
                })
            },
            fail: err => {
                console.error(err)
            }
        })
    },
    showBooks: function (e) {
        console.log(1)
        var that = this
        var dataList = encodeURIComponent(JSON.stringify(that.data.dataList));
        wx.navigateTo({
            url: '/pages/updateBooks/updateBooks?dataList=' + dataList,
        })
    },

    showNotes: function (e) {
        console.log(e.currentTarget)
        db.collection('myNote').where({
            _openid: app.globalData.openId,
            _id: e.currentTarget.id
        }).get({
            success: res => {
                console.log(res.data[0])
                var dataList = encodeURIComponent(JSON.stringify(res.data[0]));
                wx.navigateTo({
                    url: '/pages/updateNotes/updateNotes?dataList=' + dataList,
                })
            },
            fail: err => {
                console.error(err)
            }
        })

    },

    onCreate: function (e) {
        var that = this
        app.globalData.bookList = JSON.stringify(that.data.dataList);
        app.globalData.choosed = true
        wx.switchTab({
            url: '/pages/add/add',
        })
    },

    showAll(e) {
        var that = this
        db.collection("myNote").where({
            _openid: app.globalData.openId,
            isbn: that.data.dataList.isbn
        }).get({
            success: res => {
                console.log(res.data)
                that.setData({
                    noteList: res.data
                })
            },
            fail: err => {
                console.error(err)
            }
        })

    },

    onSearch(e) {
        var that = this
        console.log(e.detail.value)
        if(e.detail.value !=''){
            db.collection('myNote').where({
                _openid: app.globalData.openId,
                isbn: that.data.dataList.isbn,
                tags: e.detail.value
            }).get({
                success: res => {
                    console.log(res.data)
                    that.setData({
                        noteList: res.data
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
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        var that = this
        db.collection("myNote").where({
            _openid: app.globalData.openId,
            isbn: that.data.dataList.isbn
        }).get({
            success: res => {
                console.log(res.data)
                console.log(res.data.length)
                that.setData({
                    number: res.data.length,
                    noteList: res.data
                })
            },
            fail: err => {
                console.error(err)
            }
        })
        db.collection("myBook").where({
            _openid: app.globalData.openId,
            isbn: that.data.dataList.isbn
        }).get({
            success: res => {
                console.log(res.data)
                console.log(res.data.length)
                that.setData({
                    dataList: res.data[0]
                })
            },
            fail: err => {
                console.error(err)
            }
        })

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