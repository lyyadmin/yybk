// pages/news/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infos:[]
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
    this.loadData();
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

  loadData:function(){
    var that = this;
    wx.request({
      url: 'https://api.shenjian.io/', // 仅为示例，并非真实的接口地址
      data: {
        appid:'a8622fb1d921c0d9d75602a98cbe8339'
      },
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data && res.data.data && res.data.data.length>0){
          that.setData({ infos:res.data.data});
        } else {
          console.log(res)
        }
      },
      fail(err){
        console.log(err)
      }
    })
  },

  informationItem:function(e){
    var path = e.currentTarget.dataset.path;
    var title = e.currentTarget.dataset.title;
    // console.log(id);
    wx.navigateTo({
      url: '../infoitem/infoitem?path=' + path+'&title='+title,
    })
  }
})