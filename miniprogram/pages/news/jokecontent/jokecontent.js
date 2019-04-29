// pages/home/jokecontent/jokecontent.js
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'笑笑',
    postid:'',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let postid = options.postid;
    this.setData({ postid: postid});

    /**
    * WxParse.emojisInit(reg,baseSrc,emojis)
    * 1.reg，如格式为[00]=>赋值 reg='[]'
    * 2.baseSrc,为存储emojis的图片文件夹
    * 3.emojis,定义表情键值对
    */
    WxParse.emojisInit('[]', "../../../wxParse/emojis/", {
      "00": "00.gif",
      "01": "01.gif",
      "02": "02.gif",
      "03": "03.gif",
      "04": "04.gif",
      "05": "05.gif",
      "06": "06.gif",
      "07": "07.gif",
      "08": "08.gif",
      "09": "09.gif",
      "09": "09.gif",
      "10": "10.gif",
      "11": "11.gif",
      "12": "12.gif",
      "13": "13.gif",
      "14": "14.gif",
      "15": "15.gif",
      "16": "16.gif",
      "17": "17.gif",
      "18": "18.gif",
      "19": "19.gif",
    });

    if (postid) {
      wx.getStorage({
        key: postid,
        success: function (res) {
          if (res.data) {
            WxParse.wxParse('joke', 'html', res.data, that, 5);
          } else {
            that.loadContent(postid);
            console.log(res);
          }
        },
        fail: function (err) {
          that.loadContent(postid);
          console.log(err);
        }
      })
    }
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

  },

  loadContent: function (postid){
    var that = this;
    that.setData({ getdata: false });
    wx.request({
      url: 'https://c.m.163.com/nc/article/' + postid+'/full.html',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res && res.data && res.data[that.data.postid]) {
          let data = res.data[that.data.postid];
          wx.setNavigationBarTitle({
            title: data.title,
          });
          let body = that.contentToHtml(data);
          that.setData({ content: body });
          WxParse.wxParse('joke', 'html', body, that, 5);
          wx.setStorage({
            key: that.data.postid,
            data: body,
          })
          // console.log(res);
        } else {
          console.log(res)
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  contentToHtml:function(data){
    let body = data.body;
    let imgs = data.img;
    for(let i in imgs){
      let img = imgs[i];
      let ref = img.ref;
      let imgStr = '<img src="' +img.src+'" alt="'+img.alt+'" style="">';
      body = body.replace(ref, imgStr);
    }
    // body = body.replace(/p/,'div');
    return '<body>'+body+'</body>';
  }
})