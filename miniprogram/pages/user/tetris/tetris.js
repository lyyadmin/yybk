// pages/user/tetris/tetris.js
import Tetris from './js/Tetris'
var width, height, ctx, tetris;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
      success: function (res) {
        width = res.windowWidth
        height = res.windowHeight
        console.log(width, height)
        ctx = wx.createContext()
        tetris = new Tetris(width, height, ctx);
        tetris.init(function (msg) {
          console.log(msg);
          tetris.onShow();
          that.timer = setInterval(that.refreshView, 100);
        });
        that.refreshView();
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (tetris) {
      tetris.onShow();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (tetris) {
      tetris.onHide();
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.timer);
    if (tetris) {
      tetris.onHide();
    }
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
  refreshView: function () {
    if (tetris) {
      tetris.onDraw();
    }
    wx.drawCanvas({
      canvasId: 'canvas',
      actions: ctx.getActions()
    })
  },
  canvasClick: function (e) {
    if (tetris) {
      tetris.onClick(e);
    }
  }
})