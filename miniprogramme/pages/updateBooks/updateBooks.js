// pages/new/new.js
const db = wx.cloud.database()
const app = getApp()
var util = require('../utils/utils.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        defaultImg: '/icons/book.png',
        bookImage: '',
        groups: [{
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

    onChangeTap(e) {
        console.log(e.detail.current)
        var that = this
        that.setData({
            bookImage: e.detail.current
        })
    },

    change(e) {
        let groups = this.data.groups;
        groups.forEach(item => {
            if (item.name == e.detail.key) {
                item.checked = e.detail.checked;
            }
        });
        this.setData({
            groups: groups
        });
    },

    modalinput() {
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
    },

    submit: function (e) {
        const {
            detail
        } = e;
        var that = this
        console.log(detail.values)
        console.log(app.globalData.openId)
        console.log(that.data.bookImage)
        const bookData = detail.values
        console.log(util.formatTime(new Date()))
        const group = new Array()
        for (let i = 0; i < bookData.group.length; i++) {
            group.push(bookData.group[i].value)
        }
        console.log(group)
        db.collection('mybook').where({
            _openid: app.globalData.openId,
            isbn: bookData.isbn
        }).get({
            success: res => {
                console.log(res.data)
                console.log(res.data[0]._id)
                db.collection('mybook').doc(res.data[0]._id).update({
                        data: {
                            author: bookData.author,
                            category: bookData.category,
                            cover_url: that.data.bookImage,
                            group: group,
                            isbn: bookData.isbn,
                            publish: bookData.publish,
                            publishDate: bookData.publishDate,
                            status: bookData.status,
                            title: bookData.title,
                            url: bookData.url,
                            date: util.formatTime(new Date())
                        },
                    }).then(res => {
                        console.log('更新数据成功')
                        wx.showToast({
                            title: '更新记录成功'
                        })
                        wx.navigateBack({
                            delta: 1,
                        })
                    })
                    .catch(err => {
                        console.log('更新数据失败')
                        wx.showToast({
                            title: '更新记录失败'
                        })
                        wx.navigateBack({
                            delta: 1,
                        })
                    })


            },
            fail: err => {
                console.log(err)
            }

        })

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
        // var group = dataList.group
        // var groupList = this.data.groups
        // for(let i = 0; i<group.length;i++){
        //     for(let j = 0; j<groupList.length;j++){
        //         if(group[i]==groupList[j].name){
        //             groupList[j].checked=true
        //         }
        //     }
        // }
        this.setData({
            dataList: dataList,
            bookImage: dataList.cover_url,
            // groups:groupList
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