// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
var rp = require('request-promise')

exports.main = async (event, context) => {
    // const wxContext = cloud.getWXContext()
    console.log(event);
    // return event.isbn
    var res = rp('https://book-1826000-1310697903.ap-shanghai.run.tcloudbase.com/isbn/' + event.isbn).then(html => {
        return html;
    }).catch(err => {
        console.log(err)
    })
    return res
    // return {
    //     event,
    //     openid: wxContext.OPENID,
    //     appid: wxContext.APPID,
    //     unionid: wxContext.UNIONID,
    // }
}