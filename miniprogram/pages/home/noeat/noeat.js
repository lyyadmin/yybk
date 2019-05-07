// pages/home/noeat/noeat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noeats: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadNoEatData();
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

  loadNoEatData: function () {
    var self = this;
    wx.getStorage({
      key: 'noeats',
      success: function (res) {
        if (res.data && res.data.length > 0) {
          self.setData({ noeats: res.data });
          wx.setNavigationBarTitle({
            title: '饮食禁忌',
          });
          // console.log(res);
        } else {
          console.log('查询记录失败：', res)
          const db = wx.cloud.database();
          db.collection('noeat').get({
            success: res => {
              if (res.data && res.data.length > 0) {
                self.setData({ noeats: res.data });
                wx.setStorage({
                  key: 'noeats',
                  data: res.data,
                });
                // console.log(res);

                wx.setNavigationBarTitle({
                  title: '饮食禁忌',
                });
              } else {
                console.log('查询记录失败：', res)
              }
            },
            fail: err => {
              console.error('查询记录失败：', err)
            }
          })
        }
      },
      fail: function (err) {
        const db = wx.cloud.database();
        db.collection('noeat').get({
          success: res => {
            if (res.data && res.data.length > 0) {
              self.setData({ noeats: res.data });
              wx.setStorage({
                key: 'noeats',
                data: res.data,
              });
              // console.log(res);
              wx.setNavigationBarTitle({
                title: '饮食禁忌',
              });
            } else {
              console.log('查询记录失败：', res)
            }
          },
          fail: err => {
            console.error('查询记录失败：', err)
          }
        })
      }
    })
  },

  noeatItem: function (e) {
    let item = e.currentTarget.dataset.iteminfo;
    wx.navigateTo({
      url: '../../news/noeatitem/noeatitem?pageid=' + item._id,
    })
  }
})