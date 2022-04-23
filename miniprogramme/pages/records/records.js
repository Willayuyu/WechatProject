// pages/records/records.js
const app = getApp();
const db = wx.cloud.database({});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [{
                pagePath: "/pages/index/index",
                iconPath: "/icons/index.png",
                selectedIconPath: "/icons/index-selected.png"
            },
            {
                pagePath: "/pages/books/books",
                iconPath: "/icons/book.png",
                selectedIconPath: "/icons/book-selected.png"
            },
            {
                pagePath: "/pages/add/add",
                iconPath: "/icons/add.png",
                selectedIconPath: ""
            },
            {
                pagePath: "/pages/records/records",
                iconPath: "/icons/record.png",
                selectedIconPath: "/icons/record-selected.png"
            },
            {
                pagePath: "/pages/mine/mine",
                iconPath: "/icons/mine.png",
                selectedIconPath: "/icons/mine-selected.png"
            }
        ],
        noteNumber:'',
        noteList:[],
        currentPage: 0,
        totalPage: 2,
        swiperData: [{
            words:"你的书摘"
        }, {
           words:"上下滑动切换卡片"
        }]
    },
    
    loadMore({
        detail
    }) {
        if(this.data.currentPage >= this.data.totalPage) return; //大于总页数时退出
        detail.addToList(this.data.noteList); 
        // wx.request({
        //     url: 'yourApiurl', //仅为示例，并非真实的接口地址
        //     data: {
        //         page: this.data.currentPage,
        //     },
        //     success (res) {
        //         detail.addToList(res.data); //调用detail.addToList将新数据累加到组件内部数据
        //     }
        // })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        if (app.globalData.openId!=''){
            db.collection("notes").where({
                _openid: app.globalData.openId,
            }).get({
                success: res => {
                    console.log(res.data)
                    console.log(res.data.length)
                    that.setData({
                        noteNumber: res.data.length,
                        noteList: res.data
                    })
                },
                fail: err => {
                    console.error(err)
                }
            })
        }
        else{
            that.setData({
                noteNumber:'',
                noteList: ''
            })
            wx.showToast({
              title: '请先登录',
            })
        }
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
        this.onLoad()

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