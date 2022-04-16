// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event.value)
    var res = rp('https://book-1826000-1310697903.ap-shanghai.run.tcloudbase.com/search/' + event.value).then(html => {
        return html;
    }).catch(err => {
        console.log(err)
    })
    return res
}