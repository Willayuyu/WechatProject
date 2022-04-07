// pages/books/books.js
Page({

    /**
     * 页面的初始数据
     */
    data:{
        list:[
            {
                pagePath:"/pages/index/index",
                iconPath:"/icons/index.png",
                selectedIconPath:"/icons/index-selected.png"
            },
            {
                pagePath:"/pages/books/books",
                iconPath:"/icons/book.png",
                selectedIconPath:"/icons/book-selected.png"
            },
            {
                pagePath:"/pages/add/add",
                iconPath:"/icons/add.png",
                selectedIconPath:""
            },
            {
                pagePath:"/pages/records/records",
                iconPath:"/icons/record.png",
                selectedIconPath:"/icons/record-selected.png"
            },
            {
                pagePath:"/pages/mine/mine",
                iconPath:"/icons/mine.png",
                selectedIconPath:"/icons/mine-selected.png"
            }
        ]
    },

    changePage(){
        wx.navigateTo({
          url: '/pages/search/search',
        })
    },
    onShowDetail(){
        wx.navigateTo({
          url: '/pages/detail/detail',
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