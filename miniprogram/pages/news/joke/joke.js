// pages/news/joke/joke.js
var util = require('../../../util/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jokes: [],
    dataStr: util.getDateString(),
    playId: undefined,
    currentPage:0,
    getdata:false
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
    var that = this;
    // wx.getStorage({
    //   key: this.data.dataStr,
    //   success: function (res) {
    //     if (res.data && res.data.length > 0) {
    //       that.setData({ jokes: res.data });
    //     } else {
    //       console.log(res);
    //       that.loadData();
    //     }
    //   },
    //   fail: function (err) {
    //     console.log(err);
    //     that.loadData();
    //   }
    // })
    that.loadVedios();
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
    // if(this.data.getdata){
    //   this.loadVedios();
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  loadData: function () {
    var that = this;
    wx.request({
      url: 'https://v.juhe.cn/joke/content/list.php', // 仅为示例，并非真实的接口地址
      data: {
        key:'64ccb8d8b8aee163b4a0e82ffc2b0b32',
        page:1,
        pagesize:20,
        sort:'desc',
        time:util.getCurrentTimestamp()
      },
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(resault) {
        let res = resault.data;
        if (res.result && res.result.data && res.result.data.length > 0) {
          that.setData({ jokes: res.result.data });
          wx.setStorage({
            key: that.data.dataStr,
            data: res.result.data,
          })
        } else {
          console.log(res)
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  loadVedios: function () {
    var that = this;
    that.setData({getdata:false});
    wx.request({
      url: 'https://c.m.163.com/nc/video/list/V9LG4CHOR/n/'+this.data.currentPage+'-10.html', // 仅为示例，并非真实的接口地址
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res && res.data && res.data.V9LG4CHOR && res.data.V9LG4CHOR.length > 0) {
          let page = that.data.currentPage+1;
          let content = that.data.jokes.concat(res.data.V9LG4CHOR);
          that.setData({ jokes: content, currentPage:page ,getdata:true});
          console.log(res.data.V9LG4CHOR);
        } else {
          console.log(res)
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  playJokeVedio: function (e) {
    if (e.target && e.target.id) {
      let idstr = e.target.id;
      if (this.data.playId && this.data.playId != idstr) {
        let ctx = wx.createVideoContext(this.data.playId, this);
        ctx.pause();
        ctx = undefined;
      }
      this.setData({ playId: idstr });
    }
  }
})