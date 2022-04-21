// pages/add/add.js
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp()
const db = wx.cloud.database({});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        select: false,
        plain: true,
        hiddenmodalput: false,
        words:'',
        bookList:[],
        choosed:''
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

    modalinput() {
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
    },
    showExistBook() {
        wx.navigateTo({
            url: '/pages/existBooks/existBooks',
        })
    },

    /**
     * 获取百度access_token
     */
    onOCR() {
        var that = this
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                const tempFilePath = res.tempFilePaths[0]
                wx.getFileSystemManager().readFile({
                    filePath: tempFilePath,
                    encoding: 'base64',
                    success: function (res) {
                        //调用方法
                        console.log(res)
                        that.getImgInfo(res.data)
                    },
                })
            }
        })

    },
    //根据图片的内容调用API获取图片文字
    getImgInfo: function (imageData) {
        wx.showLoading({
            title: '识别中...',
        })
        var that = this
        var APIKEY = "GXKpgeLUVYpqvbtoB65U9s7L"
        var SECKEY = "tAAZOR8BzVH4bKWdqMa7lvYR1zGeCW5e"
        wx.cloud.callFunction({
            // 要调用的云函数名称
            name: 'getBaiduToken',
            // 传递给云函数的参数
            data: {
                apikey: APIKEY,
                seckey: SECKEY
            },
            success: res => {
                console.log(res)
                //获取token
                const token = JSON.parse(res.result).access_token
                console.log(token)
                const detectUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=${token}` // baiduToken是已经获取的access_Token 
                wx.cloud.callFunction({
                    // 要调用的云函数名称
                    name: 'getImgInfo',
                    // 传递给云函数的参数
                    data: {
                        url:detectUrl,
                        image:imageData
                    },
                    success:res=>{
                        console.log(res.result)
                        //将 res.data.words_result数组中的内容加入到words中
                        // that.setData({
                        //     words: JSON.parse(res.result).words_result
                        // })
                        console.log(JSON.parse(res.result).words_result)
                        var word = new Array()
                        for (let i = 0; i < JSON.parse(res.result).words_result_num; i++){
                            word.push(JSON.parse(res.result).words_result[i].words)
                        }
                        console.log(word)
                        console.log(word.toString())
                        console.log(word.toString().replace(/,/g, " "))
                        that.setData({
                            words: word.toString().replace(/,/g, " ")
                        })
                        wx.hideLoading()
                    },
                    fail: function (res, reject) {
                        console.log('get word fail：', res.result);
                        wx.hideLoading()
                    },
                    complete: function () {
                        wx.hideLoading()
                    }
                })

            },
            fail: err => {
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
        var that = this
        if(app.globalData.choosed!=''){
            that.setData({
                bookList: JSON.parse(app.globalData.bookList),
                choosed:app.globalData.choosed
            })
            app.globalData.bookList=''
            app.globalData.choosed=''
        }

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