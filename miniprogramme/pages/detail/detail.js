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
            userInfo: userInfo
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

    showNotes:function(e){
        console.log(e)
    },

    onCreate:function(e){

        wx.switchTab({
              url: '/pages/add/add',
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
        this.onLoad()

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