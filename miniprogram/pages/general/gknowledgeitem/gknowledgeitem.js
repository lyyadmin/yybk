// pages/general/gknowledgeitem/gknowledgeitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iteminfo:{'_id':'','title':'','msg':''},
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      let idstr = options.id;
      this.setData({ id: idstr});
      let self = this;
      wx.getStorage({
        key: 'gknowledge' + idstr,
        success: function (res) {
          if (res.data && res.data.length != 0) {
            self.setData({
              iteminfo: res.data
            });
          } else {
            console.log(res);
            self.loadData(idstr);
          }
        },
        fail: function (err) {
          console.log(err);
          self.loadData(idstr);
        }
      });
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
    this.loadData(this.data.id);
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

  loadData: function (id) {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    var self = this;
    const db = wx.cloud.database()
    db.collection('gknowledge').doc(id).get({
      success: res => {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        console.log(res.data);
        if (res.data && res.data.length != 0) {
          wx.setStorage({
            key: 'gknowledge'+id,
            data: res.data,
          })
          self.setData({
            iteminfo: res.data
          });
        }
      },
      fail: err => {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        console.error('查询记录失败：', err)
      }
    })
  },
})