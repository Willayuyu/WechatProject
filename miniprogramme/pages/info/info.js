// pages/info/info.js
const app = getApp();
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: '',
        avatarUrl: '',
        nickName: ''

    },

    onChangeTap(e) {
        console.log(e.detail.current.toString())
        var that = this
        wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
            filePath: e.detail.current.toString(), // 小程序临时文件路径
            success: res => {
                // 返回文件 ID
                console.log("上传成功", res)
                //获取文件路径
                that.setData({
                    avatarUrl: res.fileID
                })
                wx.showToast({
                    title: '图片上传成功',
                })
            },
            fail: err=>{
                console.error(err)
                wx.showToast({
                    title: '图片上传失败',
                })
            }
        })
    },

    onChangeName(e) {
        console.log(e.detail.value)
        var that = this
        that.setData({
            nickName: e.detail.value
        })
    },

    onSave(e) {
        var that = this
        db.collection('user').where({
            _openid: app.globalData.openId
        }).get({
            success: res => {
                db.collection('user').doc(res.data[0]._id).update({
                    data: {
                        avatarUrl: that.data.avatarUrl,
                        nickName: that.data.nickName
                    }
                }).then(res => {
                    console.log(res)
                    var obj = wx.getStorageSync('user')
                    obj.avatarUrl = that.data.avatarUrl
                    obj.nickName = that.data.nickName
                    wx.setStorageSync('user', obj)
                    app.globalData.userInfo = wx.getStorageSync('user')
                    wx.navigateBack({
                        delta: 1,
                    })
                }).catch(err => {
                    console.error(err)
                    wx.navigateBack({
                        delta: 1,
                    })
                })
            },
            fail: err => {
                console.error(err)
                wx.navigateBack({
                    delta: 1,
                })
            }
        })



    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        // var dataTemp = decodeURIComponent(options.info); //函数可把字符串作为 URI 组件进行解码。
        var dataList = app.globalData.userInfo;
        console.log(app.globalData.userInfo)
        that.setData({
            userInfo: dataList,
            avatarUrl: dataList.avatarUrl,
            nickName: dataList.nickName
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