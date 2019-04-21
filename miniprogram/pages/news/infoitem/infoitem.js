// pages/news/infoitem/infoitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    path:'',
    data:'加载中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let path = options.path.replace('http','https');
    console.log(path);
    if(path){
      this.setData({path:path});
      // this.loadData(path);
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