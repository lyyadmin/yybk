// pages/home/dream/dream.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    dreamInfo:[]
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

  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  getDreamInfo:function(){
    let value = this.data.inputValue;
    // console.log(this.data.inputValue);
    if (value && value != '') {
      var that = this;
      wx.request({
        url: 'http://v.juhe.cn/dream/query', // 仅为示例，并非真实的接口地址
        data: {
          key: '6f0352d4c0d27ad8447af5939b6b0d9b',
          q: value,
          full:1
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(resault) {
          let res = resault.data;
          if (res.result && res.result.length > 0) {
            that.setData({ dreamInfo: res.result });
          } else {
            console.log(res)
          }
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  },
})