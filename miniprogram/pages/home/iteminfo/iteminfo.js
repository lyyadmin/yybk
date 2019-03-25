// pages/home/iteminfo/iteminfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.itemid;
    this.onTypelist(id);
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

  refresh: function (info) {
    this.setData({
      info: info
    });
    wx.setNavigationBarTitle({
      title: info.title,
    })
  },

  /**
   * 查询iteminfo
   */
  onTypelist: function (idstr) {
    var self = this;
    const db = wx.cloud.database()
    db.collection('typelist').doc(idstr).get({
      success: res => {
        console.log(res.data);
        if (res.data) {
          self.refresh(res.data)
        }
      },
      fail: err => {
        console.error('查询记录失败：', err)
      }
    })
  }
})