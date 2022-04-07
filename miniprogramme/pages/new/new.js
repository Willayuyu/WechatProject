// pages/new/new.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [{
                id: 1,
                name: '青瓷',
                checked: false
            },
            {
                id: 2,
                name: '双棍',
                checked: false
            },
            {
                id: 3,
                name: '明天',
                checked: false
            },
            {
                id: 4,
                name: '后来',
                checked: false
            },
            {
                id: 5,
                name: '晴天',
                checked: false
            },
            {
                id: 6,
                name: '再见悲哀',
                checked: false
            }
        ]

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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.lin.initValidateForm(this)
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