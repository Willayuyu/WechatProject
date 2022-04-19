// pages/add/add.js
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        select: false,
        plain: true,
        hiddenmodalput: false,
    },
    /**
     * 获取 CapsuleBar 高度
     */
    getNavigationBarHeight() {
        const capsuleBarHeight = deviceUtil.getNavigationBarHeight()
        console.log(`CapsuleBar 的高度为${capsuleBarHeight}rpx`)
    },

    onSelect() {
        let select = this.data.select;
        let plain = this.data.plain;
        console.log(select)
        console.log(plain)
        this.setData({
            select: !select,
            plain: !plain
        })
    },

    modalinput(){
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
    },
    showExistBook(){
        wx.navigateTo({
          url: '/pages/existBooks/existBooks',
        })
    },

    /**
     * 获取百度access_token
     */
    onOCR(){
        var APIKEY = "GXKpgeLUVYpqvbtoB65U9s7L"
        var SECKEY = "tAAZOR8BzVH4bKWdqMa7lvYR1zGeCW5e"
        wx.cloud.callFunction({
            // 要调用的云函数名称
            name: 'getBaiduToken',
            // 传递给云函数的参数
            data: {
                apikey:APIKEY,
                seckey:SECKEY
            },
            success: res=>{
                console.log(res)
                
            },
            fail:err=>{
                console.error(res)
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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