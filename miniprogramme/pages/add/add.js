// pages/add/add.js
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp()
const db = wx.cloud.database({});
var util = require('../utils/utils.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        select: false,
        plain: true,
        hiddenmodalput: false,
        words: '',
        bookList: [],
        choosed: '',
        tagList: [],
        bookImage:[]
    },
    /**
     * 获取 CapsuleBar 高度
     */
    getNavigationBarHeight() {
        const capsuleBarHeight = deviceUtil.getNavigationBarHeight()
        console.log(`CapsuleBar 的高度为${capsuleBarHeight}rpx`)
    },

    onSelect(e) {
        var that = this;
        console.log(e.detail.name)
        var list = that.data.tagList
        for (let i = 0; i < list.length; i++) {
            if (list[i].name == e.detail.name) {
                list[i].select = !list[i].select
                list[i].plain = !list[i].plain
            }
        }
        that.setData({
            tagList: list,
        })
        console.log(that.data.tagList)
    },

    modalinput() {
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
    },
    showExistBook() {
        if (app.globalData.openId != '') {
            wx.navigateTo({
                url: '/pages/existBooks/existBooks',
            })
        }else{
            wx.showToast({
              title: '请先登录',
            })
            // wx.switchTab({
            //   url: '/pages/mine/mine',
            // })
        }
    },

    confirmTag: function (e) {
        var that = this
        console.log(e.detail.value)
        var obj = {
            name: e.detail.value,
            select: false,
            plain: true
        }
        app.globalData.tag.push(obj)
        console.log(app.globalData.tag)
        e.detail.value = ''
        that.onLoad()
    },

    getContent:function(e){
        var that=this
        console.log(e.detail.value)
        that.setData({
            words:e.detail.value
        })
    },

    onChangeTap:function(e){
        console.log(e.detail.all)
        var that = this
        that.setData({
            bookImage:e.detail.all
        })
    },

    onSave:function(e){
        if (app.globalData.openId != '') {
            var that = this
            console.log(that.data.bookList)
            console.log(that.data.words)
            console.log(that.data.bookImage)
            console.log(that.data.tagList)
            var tags=new Array()
            for(let i=0;i<that.data.tagList.length;i++){
                if(that.data.tagList[i].select){
                    tags.push(that.data.tagList[i].name)
                }
            }
            db.collection("notes").add({
                data:{
                    isbn:that.data.bookList.isbn,
                    title:that.data.bookList.title,
                    words:that.data.words,
                    image:that.data.bookImage,
                    tags:tags,
                    date: util.formatTime(new Date())
                }
            }).then(res => {
                console.log(res)
                wx.switchTab({
                    url: '/pages/index/index',
                })
            }).catch(err => {
                console.log(err)
            })
        }else{
            wx.showToast({
              title: '请先登录',
            })
            // wx.switchTab({
            //   url: '/pages/mine/mine',
            // })
        }
        
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
                        url: detectUrl,
                        image: imageData
                    },
                    success: res => {
                        console.log(res.result)
                        //将 res.data.words_result数组中的内容加入到words中
                        // that.setData({
                        //     words: JSON.parse(res.result).words_result
                        // })
                        console.log(JSON.parse(res.result).words_result)
                        var word = new Array()
                        for (let i = 0; i < JSON.parse(res.result).words_result_num; i++) {
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
        this.setData({
            tagList: app.globalData.tag
        })
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
        if (app.globalData.choosed != '') {
            that.setData({
                bookList: JSON.parse(app.globalData.bookList),
                choosed: app.globalData.choosed
            })
            app.globalData.bookList = ''
            app.globalData.choosed = ''
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