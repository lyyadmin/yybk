// pages/news/information/information.js
var util = require('../../../util/utils.js')
var base64 = require('../../../util/base64.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:[],
    navData: [//类型,,top(头条，默认),shehui(社会),guonei(国内),guoji(国际),yule(娱乐),tiyu(体育)junshi(军事),keji(科技),caijing(财经),shishang(时尚)
      // {
      //   text: '头条',
      //   pinyin:'top'
      // },
      {
        text: '社会',
        pinyin: 'shehui'
      },
      {
        text: '国内',
        pinyin: 'guonei'
      },
      {
        text: '国际',
        pinyin: 'guoji'
      },
      {
        text: '娱乐',
        pinyin: 'yule'
      },
      {
        text: '体育',
        pinyin: 'tiyu'
      },
      {
        text: '军事',
        pinyin: 'junshi'
      },
      {
        text: '科技',
        pinyin: 'keji'
      },
      {
        text: '财经',
        pinyin: 'caijing'
      },
      {
        text: '时尚',
        pinyin: 'shishang'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    dataStr: util.getDateString(),
    show: false,
    vedios:[],
    playId:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    wx.getStorage({
      key: 'top' + this.data.dataStr,
      success: function(res) {
        if (res.data && res.data.length > 0) {
          that.setData({ top: res.data });
        }else{
          console.log(res);
          that.loadData('top');
        }
      },
      fail: function (err) {
        console.log(err);
        that.loadData('top');
      }
    })

    this.loadShow();
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

  loadData:function(type){
    var that = this;
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index', // 仅为示例，并非真实的接口地址
      data: {
        key:'110f764a17ab628193228035f56acd9a',
        type:type
      },
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data && res.data.result && res.data.result.data && res.data.result.data.length>0){
          //类型,,top(头条，默认),shehui(社会),guonei(国内),guoji(国际),yule(娱乐),tiyu(体育)junshi(军事),keji(科技),caijing(财经),shishang(时尚)
          if (type == 'top') {
            that.setData({ top: res.data.result.data });
          } else if (type == 'shehui') {
            that.setData({ shehui: res.data.result.data });
          } else if (type == 'guonei') {
            that.setData({ guonei: res.data.result.data });
          } else if (type == 'guoji') {
            that.setData({ guoji: res.data.result.data });
          } else if (type == 'yule') {
            that.setData({ yule: res.data.result.data });
          } else if (type == 'tiyu') {
            that.setData({ tiyu: res.data.result.data });
          } else if (type == 'junshi') {
            that.setData({ junshi: res.data.result.data });
          } else if (type == 'keji') {
            that.setData({ keji: res.data.result.data });
          } else if (type == 'caijing') {
            that.setData({ caijing: res.data.result.data });
          } else if (type == 'shishang') {
            that.setData({ shishang: res.data.result.data });
          }else{
            console.log('type err !');
          }
          wx.setStorage({
            key: type+that.data.dataStr,
            data: res.data.result.data,
          })
          that.saveData({ type: type, data: res.data.result.data})
        } else {
          console.log(res)
          that.getDatas(type);
        }
      },
      fail(err){
        console.log(err)
        that.getDatas(type);
      }
    })
  },

  getDatas: function (type) {
    var that = this;
    const db = wx.cloud.database();
    db.collection('news').where({ type: type }).get({
      success: res => {
        if (res.data && res.data.length > 0) {
          if (type == 'top') {
            that.setData({ top: res.data[0].data });
          } else if (type == 'shehui') {
            that.setData({ shehui: res.data[0].data });
          } else if (type == 'guonei') {
            that.setData({ guonei: res.data[0].data });
          } else if (type == 'guoji') {
            that.setData({ guoji: res.data[0].data });
          } else if (type == 'yule') {
            that.setData({ yule: res.data[0].data });
          } else if (type == 'tiyu') {
            that.setData({ tiyu: res.data[0].data });
          } else if (type == 'junshi') {
            that.setData({ junshi: res.data[0].data });
          } else if (type == 'keji') {
            that.setData({ keji: res.data[0].data });
          } else if (type == 'caijing') {
            that.setData({ caijing: res.data[0].data });
          } else if (type == 'shishang') {
            that.setData({ shishang: res.data[0].data });
          } else {
            console.log('type err !');
          }
          wx.setStorage({
            key: type + that.data.dataStr,
            data: res.data[0].data,
          })
          that.saveData({ type: type, data: res.data[0].data })
        } else {
          console.log(res);
        }
      },
      fail: err => {
        console.error('更新记录失败：', err);
      }
    })
  },

  saveData: function (data) {
    var that = this;
    const db = wx.cloud.database();
    db.collection('news').where({ type: data.type }).get({
      success: res => {
        if (res.data && res.data.length > 0) {
          let id = res.data[0]._id;
          that.updataData(id, data);
        } else {
          that.addData(data);
        }
      },
      fail: err => {
        console.error('更新记录失败：', err);
        that.addData(data);
      }
    })
  },

  updataData: function (id, data) {
    const db = wx.cloud.database();
    db.collection('news').doc(id).update({
      data: {data:data.data},
      success: res => {
        console.log('更新记录成功！', res);
      },
      fail: err => {
        console.error('更新记录失败：', err)
      }
    })
  },

  addData: function (data) {
    const db = wx.cloud.database();
    db.collection('news').add({
      // data 字段表示需新增的 JSON 数据
      data: data,
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

  informationItem:function(e){
    var path = e.currentTarget.dataset.path;
    // var title = e.currentTarget.dataset.title;
    // console.log(id);
    path = base64.encode(path);
    wx.navigateTo({
      url: '../infoitem/infoitem?path=' + path,
    })
  },
  
  moreInfo:function(e){
    let type = e.currentTarget.dataset.type;
    console.log(type);
    wx.navigateTo({
      url: '../infomore/infomore?type=' + type,
    })
  },

  loadShow:function(){
    var self = this;
    const db = wx.cloud.database()
    db.collection('config').doc('XL6giVsqTi00trzy').get({
      success: res => {
        if (res.data) {
          self.setData({
            show: res.data.show_news
          });
          if (!res.data.show_news){
            this.loadVedios();
          }
        }
      },
      fail: err => {
        console.error('查询记录失败：', err)
      }
    })
  },

  loadVedios: function () {
    var self = this;
    const db = wx.cloud.database()
    db.collection('yangshengvedio').get({
      success: res => {
        console.log(res);
        if (res.data && res.data.length>0) {
          self.setData({
            vedios: res.data
          });
        }else{
          console.log(res);
        }
      },
      fail: err => {
        console.error('查询记录失败：', err);
      }
    })
  },
  playVedio:function(e){
    if(e.target && e.target.id){
      let idstr = e.target.id;
      if (this.data.playId) {
        let ctx = wx.createVideoContext(this.data.playId, this);
        ctx.pause();
        ctx = undefined;
      }
      this.setData({ playId:idstr});
    }
  }
})