// pages/home/typelist/typelist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    typename:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    var title = options.title;
    if(title){
      wx.setNavigationBarTitle({
        title: title+'列表',
      })
    }
    if (options.typename) {
      this.setData({ typename: options.typename});
      wx.getStorage({
        key: 'typelist' + options.typename,
        success: function(res) {
          if (res.data && res.data.length != 0) {
            self.setData({
              list: res.data
            });
          }else{
            console.log(res);
            self.onTypelist(options.typename);
          }
        },
        fail: function (err) {
          console.log(err);
          self.onTypelist(options.typename);
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
    this.onTypelist(this.data.typename);
    wx.showNavigationBarLoading(); //在标题栏中显示加载
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

  iteminfo:function(e){
    var id = e.currentTarget.dataset.itemid;
    wx.navigateTo({
      url: '../iteminfo/iteminfo?itemid='+id,
    })
  },

  /**
   * 查询menu
   */
  onTypelist: function (type_name) {
    var self = this;
    const db = wx.cloud.database()
    db.collection('typelist').field({
      _id:true,
      pic:true,
      title:true,
      pinyin:true,
      subtitle:true,
      type_name:true
    }).where({
      menu: 1,
      type_name: type_name
    }).get({
      success: res => {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        console.log(res.data);
        if (res.data && res.data.length != 0) {
          wx.setStorage({
            key: 'typelist' + type_name,
            data: res.data,
          })
          self.setData({
            list: res.data
          });
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