// pages/records/records.js
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
        ],
        currentPage: 0,
        totalPage: 2,
        swiperData: [{
            content: " 世界上没有相同的两片叶子，也就不可能有相同的两个人。我们都是独一无二的奇迹，因为我们都曾经是千千万万中独独存活下来的那一个。",
            book:"《沉思录》",
            picture:"/image/avatar.png"
        },{
            content: "2. 世界上没有相同的两片叶子，也就不可能有相同的两个人。我们都是独一无二的奇迹，因为我们都曾经是千千万万中独独存活下来的那一个。",
            book:"《沉思录》"
        },{
            content: "3. 世界上没有相同的两片叶子，也就不可能有相同的两个人。我们都是独一无二的奇迹，因为我们都曾经是千千万万中独独存活下来的那一个。",
            book:"《沉思录》"
        }]
    },
    loadMore({detail}){
        // if(this.data.currentPage >= this.data.totalPage) return; //大于总页数时退出
        // wx.request({
        //     url: 'yourApiurl', //仅为示例，并非真实的接口地址
        //     data: {
        //         page: this.data.currentPage,
        //     },
        //     success (res) {
        //         detail.addToList(res.data); //调用detail.addToList将新数据累加到组件内部数据
        //     }
        // })
        if(this.data.currentPage >= 1) return; //模拟总页数为3
        
        // mock数据（请求api分页数据）
        setTimeout(()=> {
            this.data.currentPage++;
            detail.addToList([
                {
                  name: `page: ${JSON.parse(JSON.stringify(this.data.currentPage))}, index: 1`,
                },
                {
                  name: `page: ${JSON.parse(JSON.stringify(this.data.currentPage))}, index: 2`,
                },
                {
                  name: `page: ${JSON.parse(JSON.stringify(this.data.currentPage))}, index: 3`,
                },
            ])
        }, 1000)
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