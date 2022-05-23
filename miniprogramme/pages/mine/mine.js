// pages/mine/mine.js
const app = getApp();
const db = wx.cloud.database();
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
        userInfo: '',
        isLogin: false,
    },

    showInfo: function (e) {
        var that = this
        console.log(that.data.userInfo)
        var info = encodeURIComponent(JSON.stringify(that.data.userInfo));
        wx.navigateTo({
            url: '/pages/info/info?info=' + info,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = app.globalData.userInfo;
        let isLogin = app.globalData.isLogin;
        this.setData({
            userInfo: userInfo,
            isLogin: isLogin,
        })
    },
    getOpenId: function (e) {
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log('[云函数] [login] user openid: ', res.result.openid)
                app.globalData.openId = res.result.openid
                console.log(app.globalData.openId)
                wx.setStorageSync('openId', app.globalData.openId);
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
            }
        })
    },
    login: function (e) {
        let that = this;
        that.getOpenId()
        let openId = app.globalData.openId;
        let userInfo = app.globalData.userInfo;
        console.log(openId)
        if (userInfo == '') {
            wx.getUserProfile({
                desc: '授权',
                success: res => {
                    var information = res.userInfo
                    // that.setData({
                    //     userInfo: res.userInfo,
                    //     isLogin: true
                    // })
                    // console.log(that.data.userInfo)
                    // // that.data.userInfo.openId = openId
                    // wx.setStorageSync('user', res.userInfo)
                    // app.globalData.isLogin = true
                    db.collection('user').where({
                            _openid: openId
                        })
                        .get({
                            success: res => {
                                if (res.data.length == 0) {
                                    let userInfo = information
                                    db.collection('user').add({
                                        data: {
                                            nickName: userInfo.nickName,
                                            avatarUrl: userInfo.avatarUrl,
                                        },
                                        success: res => {
                                            console.log('用户信息已保存到数据库', res)
                                            var obj = {}
                                            obj.avatarUrl = userInfo.avatarUrl
                                            obj.nickName = userInfo.nickName
                                            wx.setStorageSync('user', obj)
                                            that.setData({
                                                userInfo: obj,
                                                isLogin: true
                                            })
                                            app.globalData.userInfo = wx.getStorageSync('user')
                                            app.globalData.isLogin = true
                                        },
                                        fail: err => {
                                            console.log('用户信息保存失败', err)
                                        }
                                    })
                                } else {
                                    db.collection('user').where({
                                        _openid: openId
                                    }).get({
                                        success: res => {
                                            that.setData({
                                                userInfo: res.data[0],
                                                isLogin: true
                                            })
                                            app.globalData.isLogin = true
                                            console.log(res.data[0])
                                            app.globalData.userInfo = res.data[0]
                                            wx.setStorageSync('user', res.data[0])
                                        },
                                        fail: err => {
                                            console.error(err)
                                        }
                                    })
                                    console.log("此用户已被记录过！")
                                }
                            },
                            fail: err => {
                                console.error(err)
                            }
                        })
                },
                fail: err => {
                    console.error(err)
                }
            })
        }

    },

    loginOut() {
        this.setData({
            userInfo: '',
            isLogin: false
        })
        //清理本地缓存
        wx.setStorageSync('user', null)
        app.globalData.userInfo = ''
        wx.setStorageSync('openId', null)
        app.globalData.isLogin = false
        console.log("退出登录！")
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
    onShareAppMessage: function (res) {
        //可以通过res.from来判断是button分享还是menu分享（右上角）
        console.log(res);
        return {
            // 分享的标题如果没有则自定义为小程序名称全写
            title: "小鱼书摘",
            //分享之后的路径如果没有则自定义为首页可以用模板字符串语法加入变量
            path: '/pages/mine/mine',
            //分享图片的本地地址如果不写则为默认当前屏幕截图可以是网络地址
            imageUrl: '/image/logo.png'
        }

    }
})