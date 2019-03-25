// pages/home/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    indicator_color: 'rgba(48, 191, 109, .3)',
    indicator_active_color:'rgba(48, 191, 109, .8)',
    types: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onQuery();
    this.onTypelist();
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
    this.setData({
      autoplay:true
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      autoplay: false
    });
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
   * 查询banner图
   */
  onQuery: function () {
    var self = this;
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('bannerlist').get({
      success: res => {
        console.log(res.data);
        if (res.data && res.data.length != 0) {
          self.setData({
            imgUrls: res.data
          });
        }
      },
      fail: err => {
        console.error('查询记录失败：', err)
      }
    })
  },

  /**
   * 查询menu
   */
  onTypelist: function () {
    var self = this;
    const db = wx.cloud.database()
    db.collection('typelist').where({
      menu:0
    }).get({
      success: res => {
        console.log(res.data);
        if (res.data && res.data.length != 0) {
          self.setData({
            types: res.data
          });
        }
      },
      fail: err => {
        console.error('查询记录失败：', err)
      }
    })
  },

  typelistPage:function(e){
    var name = e.currentTarget.dataset.title;
    var typename = e.currentTarget.dataset.typename;
    wx.navigateTo({
      url: '../typelist/typelist?title=' + name + '&typename=' + typename,
    })
  },

  pageToHealth: function (e) {
    var pageid = e.currentTarget.dataset.pageid;
    wx.navigateTo({
      url: '../page/page?pageid=' + pageid
    })
  }
})