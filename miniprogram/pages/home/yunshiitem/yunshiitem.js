// pages/home/yunshiitem/yunshiitem.js
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base:'https://6c79-lyy-8910599-1258475508.tcb.qcloud.la/wap/yunshi/2019/',
    title: '',
    path: '',
    data: '加载中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    let path = this.data.base + type + '.html';
    console.log(path);
    if (path) {
      this.setData({ path: path });
      this.loadData(path);
    }

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

  loadData: function (url) {
    var that = this;
    wx.request({
      url: url, // 仅为示例，并非真实的接口地址
      data: {
        key: '110f764a17ab628193228035f56acd9a'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data && res.data.length > 0) {
          that.setData({ data: res.data });
          WxParse.wxParse('article', 'html', res.data, that, 5);
          wx.setStorage({
            key: url + that.data.dataStr,
            data: res.data,
          })
        } else {
          console.log(res)
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  }
})