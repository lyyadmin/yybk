// pages/home/page/page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageinfo:{},
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.pageid){
      let self = this;
      var idstr = options.pageid;
      this.setData({id:idstr});
      wx.getStorage({
        key: 'pages'+idstr,
        success: function (res) {
          if (res.data) {
            self.refresh(res.data)
          }else{
            console.log(res);
            self.onPageInfo(idstr);
          }
        },
        fail:function(err){
          console.log(err);
          self.onPageInfo(idstr);
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
    this.onPageInfo(this.data.id);
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
      pageinfo: info
    });
    wx.setNavigationBarTitle({
      title: info.title,
    })
  },

  /**
   * 查询page
   */
  onPageInfo: function (idstr) {
    wx.showNavigationBarLoading();
    var self = this;
    const db = wx.cloud.database()
    db.collection('pages').doc(idstr).get({
      success: res => {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        console.log(res.data);
        if (res.data) {
          wx.setStorage({
            key: 'pages'+idstr,
            data: res.data,
          })
          self.refresh(res.data)
        }
      },
      fail: err => {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        console.error('查询记录失败：', err)
      }
    })
  }
})