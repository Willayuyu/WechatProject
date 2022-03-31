// app.js
App({
    onLaunch: function(){
        console.log("Let's begin!")
        wx.cloud.init({
            env: 'cloud-1g5k6lc9f671fc83',
            traceUser: true
        })
    },
    globalData: {
        userInfo: null
      }
})
