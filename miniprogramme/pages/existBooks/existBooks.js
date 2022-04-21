// pages/existBooks/existBooks.js
const db = wx.cloud.database({});
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        defaultBook: []

    },

    onShowSearch() {
        wx.navigateTo({
            url: '/pages/search/search',
        })
    },

    showDetail: function (e) {
        console.log(e.currentTarget.id)
        const db = wx.cloud.database({});
        db.collection('mybook').where({
            _openid: app.globalData.openId,
            isbn: e.currentTarget.id
        }).get({
            success: res => {
                console.log(res.data[0])
                var dataList = JSON.stringify(res.data[0]);
                app.globalData.bookList = dataList;
                app.globalData.choosed = true
                wx.switchTab({
                    url: '/pages/add/add',
                })
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
        var that = this
        db.collection('mybook').where({
            _openid: app.globalData.openId,
        }).get({
            success: res => {
                console.log(res.data)
                that.setData({
                    defaultBook: res.data,
                })
            },
            fail: err => {
                console.error(err)
            }
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