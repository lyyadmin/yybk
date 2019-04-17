// pages/user/eyetest/eyetest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    runtime:0,
    select:[-1,-1],
    rc:2,
    raduis:0,
    number:0,
    start: false,
    resault:"点击开始按钮开始测试"
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
    this.drawBall();
  },
  refresh:function(){
    let time = this.data.runtime-1;
    if(time<0){
      var text = "视力不错嘛！";
      let rc = parseInt(this.data.number);
      if (rc > 60) {
        text = "视力不错嘛！";
      } else if (rc >= 50) {
        text = "视力很正常哦！";
      } else if (rc >= 40) {
        text = "视力基本正常哦！";
      } else if (rc >= 30) {
        text = "你的视力有点差哦！";
      } else if (rc >= 20) {
        text = "你的视力太差了吧！";
      } else {
        text = "你的视力差到极点喽！";
      }
      this.setData({ start: false, resault:text });
      this.drawBall();
      clearInterval(this.interval);
    }else{
      this.setData({runtime:time})
    }
  },
  drawBall: function () {
    var context = wx.createContext()
    var rc = this.data.rc.toFixed(0);
    console.log(rc)
    var size = 300;
    let radius = size/rc;

    function ball(x, y, color) {
      context.beginPath(0)
      context.arc(x, y, radius/2-2, 0, Math.PI * 2)
      context.setFillStyle(color)
      context.setStrokeStyle('rgba(1,1,1,0)')
      context.fill()
      context.stroke()
    }
    function randomPosition(){
      let maxn = rc-1;
      return [(Math.random() * maxn).toFixed(0), (Math.random() * maxn).toFixed(0)];
    }
    function randomColor(){
      let dis = 50;
      let r = parseInt(Math.random() * 255).toString(16);
      if(r.length==1)r = "0"+r;
      let gnum = Math.random() * 255;
      let g = parseInt(gnum).toString(16);
      if (g.length == 1) g = "0" + g;
      let g1 = 0;
      if (gnum > dis){
        g1 = parseInt(gnum - dis).toString(16);
      }else{
        g1 = parseInt(gnum + dis).toString(16);
      }
      if (g1.length == 1) g1 = "0" + g1;
      let b = parseInt(Math.random() * 255).toString(16);
      if (b.length == 1) b = "0" + b;
      return ["#" + r + g + b, "#" + r + g1 + b];
    }
    if (this.data.start) {
      let rp = randomPosition();
      let col = randomColor();
      console.log(col);
      for (let i = 0; i < rc; i++) {
        for (let j = 0; j < rc; j++) {
          let row = radius / 2 + radius * j;
          let colwn = radius / 2 + radius * i;
          let color = col[0];
          // console.log(i+","+j);
          if (rp[0] == j && rp[1] == i) {
            color = col[1];
            this.setData({ select: [row, colwn], radius: radius })
          }
          ball(row, colwn, color);
        }
      }
    }else{
      let text = this.data.resault;
      context.strokeStyle = "purple";               //设置填充颜色为紫色
      context.font = '30px "楷体"';           //设置字体
      context.textBaseline = "bottom";            //设置字体底线对齐绘制基线
      context.textAlign = "center";                 //设置字体对齐的方式
      context.strokeText( this.data.resault, 150, 160 );
    }

    wx.drawCanvas({
      canvasId: 'canvas',
      actions: context.getActions()
    })
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
    clearInterval(this.interval);
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

  selectCircle:function(e){
    let target = e.target;
    let detail = e.detail;
    if (target && detail){
      let left = target.offsetLeft;
      let top = target.offsetTop;
      let x = detail.x - left;
      let y = detail.y - top;
      // console.log(x,y)
      if (this.containsCircle(x, y)){
        let rc = this.data.rc;
        let num = this.data.number+1;
        switch (parseInt(rc)){
          case 2:
            rc = rc + 0.40
            break;
          case 3:
            rc = rc + 0.35
            break;
          case 4:
            rc = rc + 0.30
            break;
          case 5:
            rc = rc + 0.25
          case 6:
            rc = rc + 0.20
            break;
          case 7:
            rc = rc + 0.15
            break;
          case 8:
            rc = rc + 0.10
          break;
          default:
            rc = rc + 0.05
          break;
        }
        if(rc>11){
          rc=11;
        }
        // console.log("rc",rc);
        this.setData({rc:rc,number:num})
        this.drawBall()
      }
    }
  },

  containsCircle:function(x,y){
    let select = this.data.select;
    let r = this.data.radius;
    let sx = select[0];
    let sy = select[1];
    // console.log(sx, sy)
    let disx = Math.abs(sx-x);
    let disy = Math.abs(sy-y);
    let dis = Math.sqrt(disx * disx + disy * disy);
    return dis<r/2;
  },
  start:function(){
    if(this.data.start){
      return;
    }
    this.setData({
      start: true, 
      runtime: 60,
      select: [-1, -1],
      rc: 2,
      raduis: 0,
      number: 0})
    this.drawBall()
    this.interval = setInterval(this.refresh, 1000)
  },
  pause: function () {
    if (this.data.start) {
      this.setData({ start: false })
      this.drawBall()
      clearInterval(this.interval);
    }
  }
})