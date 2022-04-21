// pages/new/new.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList:[],
        defaultImg:'/icons/book.png',
        group: [{
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

    change(e) {
        let items = this.data.items;
        items.forEach(item => {
            if (item.name == e.detail.key) {
                item.checked = e.detail.checked;
            }
        });
        this.setData({
            items: items
        });
    },

    modalinput() {
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
    },

    confirm:function(e){
        console.log(e.detail.value)
        console.log(e)
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
            dataList:dataList
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