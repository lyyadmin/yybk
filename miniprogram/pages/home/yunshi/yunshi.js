// pages/home/yunshi/yunshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl:'https://6c79-lyy-8910599-1258475508.tcb.qcloud.la/wap/yunshi/2019/img/',
    imgs: ['shu','niu','hu','tu','long','she','ma','yang','hou','ji','gou','zhu']
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
  yunshiItem:function(e){
    let item = e.currentTarget.dataset.yunshi;
    wx.navigateTo({
      url: '../yunshiitem/yunshiitem?type='+item,
    })
  }
})