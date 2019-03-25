// pages/user/visitday/visitday.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visitlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = app.globalData.openid;
    if(openid!=''){
      this.onQuery(openid);
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

  /**
   * 查询
   */
  onQuery: function (openid) {
    var self = this;
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('userInfo').where({
      openid: openid
    }).get({
      success: res => {
        if (res.data && res.data.length!=0) {
          self.setData({
            visitlist: res.data
          });
          console.log(res.data);
        }
      },
      fail: err => {
        console.error('查询记录失败：', err)
      }
    })
  },
})