// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event.url)
    console.log(event.image)
    let options = {
        method: 'POST',
        uri: event.url,
        form: {
            image: event.image
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'// Is set automatically
        }
    }
    console.log(options)
    var res = rp(options).then(html => {
        return html;
    }).catch(err => {
        console.log(err)
    })
    return res
}