// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event.apikey)
    console.log(event.seckey)
    let options = {
        method: 'POST',
        uri: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + event.apikey + '&client_secret=' + event.seckey,
    }
    console.log(options)
    var res = rp(options).then(html => {
        return html;
    }).catch(err => {
        console.log(err)
    })
    return res
}