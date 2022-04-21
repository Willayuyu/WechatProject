// pages/detail/detail.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList:[],
        userInfo: "",
        urls: [{
            newUrl: 'https://th.bing.com/th/id/OIP.GORpTfgdZKqcezZu4srqMwHaLd?pid=ImgDet&rs=1',
            key: 'key1',
            value:1
        }, {
            newUrl: '/image/example.png',
            key: 'key2',
            value: 2
        }]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let userInfo = app.globalData.userInfo
        console.log(userInfo)
        console.log(options.dataList)
        var dataTemp = decodeURIComponent(options.dataList); //函数可把字符串作为 URI 组件进行解码。
        var dataList = JSON.parse(dataTemp);
        console.log(dataList)
        this.setData({
            dataList: dataList,
            userInfo: userInfo
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