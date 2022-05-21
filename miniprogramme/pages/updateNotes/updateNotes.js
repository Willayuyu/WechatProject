// pages/updateNotes/updateNotes.js
const app = getApp()
const db = wx.cloud.database({});
var util = require('../utils/utils.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noteList: [],
        words: '',
        images: [],
        tagList: [],
        hiddenmodalput: false,

    },

    modalinput() {
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
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

    confirmTag: function (e) {
        var that = this
        console.log(e.detail.value)
        var obj = {
            name: e.detail.value,
            select: false,
            plain: true
        }
        // app.globalData.tag.push(obj)
        // console.log(app.globalData.tag)
        e.detail.value = ''

        var tags = that.data.tagList
        console.log(tags)
        tags.push(obj)
        that.setData({
            tagList: tags
        })
    },
    getContent: function (e) {
        var that = this
        console.log(e.detail.value)
        that.setData({
            words: e.detail.value
        })
    },

    onChangeTap: function (e) {
        console.log(e.detail.all)
        var that = this
        var imgArray = new Array()
        for (let i = 0; i < e.detail.all.length; i++) {
            wx.cloud.downloadFile({
                fileID: e.detail.all[i],
                success: res => {
                    console.log(res.tempFilePath)

                    wx.cloud.uploadFile({
                        cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
                        filePath: res.tempFilePath, // 小程序临时文件路径
                        success: result => {
                            // 返回文件 ID
                            console.log("上传成功", result)
                            //获取文件路径
                            imgArray.push(result.fileID)
                            wx.showToast({
                                title: '图片上传成功',
                            })
                        },
                        fail: err => {
                            console.error(err)
                            wx.showToast({
                                title: '图片上传失败',
                            })
                        }
                    })
                },
                fail:err=>{
                    wx.cloud.uploadFile({
                        cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
                        filePath:  e.detail.all[i], // 小程序临时文件路径
                        success: result => {
                            // 返回文件 ID
                            console.log("上传成功", result)
                            //获取文件路径
                            imgArray.push(result.fileID)
                            wx.showToast({
                                title: '图片上传成功',
                            })
                        },
                        fail: err => {
                            console.error(err)
                            wx.showToast({
                                title: '图片上传失败',
                            })
                        }
                    })
                }
            })
        }
        that.setData({
            bookImage: imgArray
        })
    },

    onSave: function (e) {
        var that = this
        console.log(that.data.noteList)
        console.log(that.data.words)
        console.log(that.data.bookImage)
        console.log(that.data.tagList)
        var tags = new Array()
        for (let i = 0; i < that.data.tagList.length; i++) {
            if (that.data.tagList[i].select) {
                tags.push(that.data.tagList[i].name)
            }
        }
        db.collection('myNote').doc(that.data.noteList._id).remove()
            .then(res => {
                console.log('删除数据成功')
                db.collection('myNote').add({
                    data: {
                        isbn: that.data.noteList.isbn,
                        title: that.data.noteList.title,
                        words: that.data.words,
                        tags: tags,
                        image: that.data.bookImage,
                        date: util.formatTime(new Date())
                    }
                }).then(res => {
                    console.log(res)
                    console.log('更新数据成功')
                    wx.showToast({
                        title: '更新记录成功'
                    })
                    that.setData({
                        words: '',
                        noteList: [],
                        choosed: '',
                        tagList: [],
                        bookImage: []
                    })
                    wx.navigateBack({
                        delta: 1,
                    })
                }).catch(err => {
                    console.log('更新数据失败')
                    wx.showToast({
                        title: '更新记录失败'
                    })
                    wx.navigateBack({
                        delta: 1,
                    })
                })
            }).catch(err => {
                console.log('删除数据失败')
                wx.showToast({
                    title: '删除失败'
                })
                wx.navigateBack({
                    delta: 1,
                })
            })
        // db.collection('myNote').doc(that.data.noteList._id).update({
        //     data: {
        //         isbn: that.data.noteList.isbn,
        //         title: that.data.noteList.title,
        //         words: that.data.words,
        //         tags: tags,
        //         image: that.data.bookImage,
        //         date: util.formatTime(new Date())
        //     }

        // }).then(res => {
        //     console.log(res)
        //     console.log('更新数据成功')
        //     wx.showToast({
        //         title: '更新记录成功'
        //     })
        //     that.setData({
        //         words: '',
        //         noteList: [],
        //         choosed: '',
        //         tagList: [],
        //         bookImage: []
        //     })
        //     wx.navigateBack({
        //         delta: 1,
        //     })

        //     // db.collection("notes").add({
        //     //     data: {
        //     //         isbn: that.data.noteList.isbn,
        //     //         title: that.data.noteList.title,
        //     //         words: that.data.words,
        //     //         image: that.data.bookImage,
        //     //         date: util.formatTime(new Date())
        //     //     }
        //     // }).then(res => {
        //     //     console.log(res)
        //     //     that.setData({
        //     //         words: '',
        //     //         noteList: [],
        //     //         choosed: '',
        //     //         tagList: [],
        //     //         bookImage: []
        //     //     })

        //     // }).catch(err => {
        //     //     console.log(err)
        //     // })
        // }).catch(err => {
        //     console.log('更新数据失败')
        //     wx.showToast({
        //         title: '更新记录失败'
        //     })
        //     wx.navigateBack({
        //         delta: 1,
        //     })
        // })

    },

    onDelete: function (e) {
        var that = this
        db.collection('myNote').doc(that.data.noteList._id).remove()
            .then(res => {
                console.log('删除数据成功')
                wx.showToast({
                    title: '删除成功'
                })
                wx.navigateBack({
                    delta: 1,
                })
            }).catch(err => {
                console.log('删除数据失败')
                wx.showToast({
                    title: '删除失败'
                })
                wx.navigateBack({
                    delta: 1,
                })
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
    onLoad(options) {
        var dataTemp = decodeURIComponent(options.dataList); //函数可把字符串作为 URI 组件进行解码。
        var dataList = JSON.parse(dataTemp);
        console.log(dataList)
        var tags = dataList.tags
        console.log(tags)
        var tagList = new Array()
        for (let i = 0; i < tags.length; i++) {
            tagList.push({
                name: tags[i],
                select: true,
                plain: false
            })
        }
        this.setData({
            noteList: dataList,
            words: dataList.words,
            images: dataList.image,
            tagList: tagList,
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