
App({
    onLaunch: function () {
        console.log("Let's begin!")
        const userInfo = wx.getStorageSync('user')
        // const openId = wx.getStorageSync('openId')
        if (userInfo) {
            console.log(userInfo)
            console.log(openId)
            this.globalData.userInfo = userInfo,
            this.globalData.isLogin = true
            // this.globalData.openId = openId
        } else {
            console.log('no userInfo');
        }
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                env: 'cloud-1g5k6lc9f671fc83',
                traceUser: true
            })
        }
    },
    globalData: {
        userInfo: '',
        openId: '',
        bookList:[],
        choosed:'',
        tag:[]
    },
    
})