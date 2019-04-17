// pages/user/mine/mine.js
var util = require('../../../util/utils.js')
var mycontant = require('../../../util/contants.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    photoUrl:"",
    nichen:"登录",
    openid:"",
    genderUrl:['../../../images/sex_boy.png','../../../images/sex_girl.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
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

  /**
   * 登陆
   */
  onLogin:function(){
    var self = this;
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          var myurl = mycontant.jscode2session +res.code;
          wx.request({
            url: myurl,
            success(res) {
              console.info(res);
            },
            fail(err){
              console.info(err);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                photoUrl: res.userInfo.avatarUrl,
                nichen: res.userInfo.nickName,
                userInfo: res.userInfo
              })
              this.onGetOpenid();
            }
          })
        }else{
          this.onGetOpenid();
        }
      },
      fail: err => {
        this.onGetOpenid();
      }
    })
  },

  /**
   * 获取openid
   */
  onGetOpenid: function () {
    var self = this;
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid;
        self.data.userInfo.openid = res.result.openid;
        wx.setStorage({
          key: 'user_info',
          data: JSON.stringify(self.data.userInfo),
        })
        self.onQuery(res.result.openid);
      },
      fail: err => {
        console.error('login 失败：', err)
      }
    })
  },

  /**
   * 查询
   */
  onQuery: function (openid) {
    var self = this;
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('userInfo').where({
      openid: openid
    }).get({
      success: res => {
        if (res.data.length==0){
          self.onAdd()
        }else{
          var data = res.data[0]
          console.log(data)
          self.onUpdate(data)
        }
      },
      fail: err => {
        console.error('查询记录失败：', err)
      }
    })
  },

  /**
   * 添加数据
   */
  onAdd: function () {
    var user = this.data.userInfo
    user.create_time = util.getCurrentTimestamp()
    user.update_time = util.getCurrentTimestamp()
    user.visit_days = 1
    const db = wx.cloud.database()
    db.collection('userInfo').add({
      data: user,
      success: res => {
        console.log('新增记录记录 _id: ', res._id)
      },
      fail: err => {
        console.error('新增记录失败：', err)
      }
    })
  },

  /**
   * 更新数据
   */
  onUpdate: function (data) {
    var updata = {
      avatarUrl: data.avatarUrl,
      city: data.city,
      country: data.country,
      gender: data.gender,
      language: data.language,
      nickName: data.nickName,
      province: data.province,
    };
    var update_time = data.update_time;
    if (!util.idSameDate(update_time)){
      updata.update_time = util.getCurrentTimestamp();
      updata.visit_days = data.visit_days+1;
    }
    const db = wx.cloud.database();
    db.collection('userInfo').doc(data._id).update({
      data: updata,
      success: res => {
        console.log('更新记录成功！',res)
      },
      fail: err => {
        icon: 'none',
        console.error('更新记录失败：', err)
      }
    })
  },

  toVisitDates:function(){
    wx.navigateTo({
      url: '../visitday/visitday',
    })
  },

  toEyeTest:function(){
    wx.navigateTo({
      url: '../eyetest/eyetest',
    })
  }
})