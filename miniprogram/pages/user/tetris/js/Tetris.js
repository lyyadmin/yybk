import MultipleCube from './MultipleCube'
import Pan from './Pan'
import Circle from './Circle'
import Triangle from './Triangle'
import Music from './music'
const Contant = require('./Contant.js').Contant
const Type = require('./Type.js').Type
const Direction = require('./Direction.js').Direction
const continueC = '#00ff00';
const darkC = '#2b2b2b';
const stopC = '#ff0000';
const pauseC = '#ffff00';

// const ctx = canvas.getContext('2d')
// let width = canvas.width;
// let height = canvas.height;
const btnimgpath = "../../../images/game_btn.png"
let width,height,ctx;
export default class Tetris{
  constructor(w,h,context){
    ctx = context;
    width = w;
    height = h;
    ctx = context;
    this.panelWidth = 0;
    this.panelHeight=0;
    this.panelPadding = 5;
    this.numEct = 0;
    // this.btnimg = new Image();
    // this.btnimg.src = btnimgpath;
    this.btnimgpath = btnimgpath;
    this.cell = 80;
    this.controlSize = 100;
    this.bg;
    this.press = false;
    this.rows = 20, this.clowns = 10;
    this.pause = false;
    this.over = false;
    this.canStart = false;
    // this.musicBtm, this.btn, this.playBtm, this.soundBtm;
    this.multipleCube;
    this.pan;
    this.timeWidth;
    this.soundOnOff = true;
    this.animal = true;
    this.updataTimeDruing = 500;
    this.render = true;
    this.timer;
    this.music = new Music();
    // this.init();
    // this.initTouchEvent();
  }

  init(callback) {
    this.panelWidth = width * 4 / 7;
    this.cell = parseInt((this.panelWidth - this.panelPadding * 2) / 10);
    this.panelHeight = this.cell * 20 + this.panelPadding * 2;
    this.timeWidth = (width - this.panelWidth - this.panelPadding * 2) / 16;

    this.controlSize = parseInt((height - this.panelHeight - this.cell * 2) / 3);

    this.bg = [0, 0, width, height];

    var centerX = width / 2;
    var centerY = parseInt(this.panelHeight + (height - this.panelHeight) / 2);
    this.initControl(centerX, centerY);

    this.pan = new Pan(this,width,height);
    this.multipleCube = new MultipleCube(Type.ERSANSI, this.panelPadding + this.cell * 2, this.panelPadding,this);
    this.updateUI();
    // this.requestAnimation();
    // this.loop(this.onDraw,1000);
    if (callback){
      callback("init complete !");
    }
  }

  palyGameSound(typ){
    if (this.soundOnOff) {
      this.music.playSound(typ);
    }
  }

  initControl(centerX, centerY) {
    var center = parseInt(this.panelWidth / 2);
    var radius = (height - this.panelHeight - this.cell * 3) / 4;
    var padding = radius * 2 / 3;
    var w = padding / 3;
    var h = parseFloat(2 * w / Math.sqrt(3));
    var paddT = w * 2;

    var cx = center - radius - padding;
    var cy = centerY;
    this.leftC = new Circle(cx, cy, radius - 3, this.btnimgpath);
    this.leftT = new Triangle(center - paddT, centerY, w, h, Direction.LEFT);

    cx = center + radius + padding;
    cy = centerY;
    this.rightC = new Circle(cx, cy, radius - 3, this.btnimgpath);
    this.rightT = new Triangle(center + paddT, centerY, w, h, Direction.RIGHT);
    cx = center;
    cy = centerY - radius - padding;
    this.upC = new Circle(cx, cy, radius - 3, this.btnimgpath);
    this.upT = new Triangle(center, centerY - paddT, w, h, Direction.UP);

    cx = center;
    cy = centerY + radius + padding;
    this.downC = new Circle(cx, cy, radius - 3, this.btnimgpath);
    this.downT = new Triangle(center, centerY + paddT, w, h, Direction.DOWN);

    cx = width / 2 + (this.rightC.getCx() + radius) / 2;
    radius = (height - this.panelHeight) / 5;
    cy = centerY + radius-10;

    this.palyC = new Circle(cx, cy, radius, this.btnimgpath);

    radius = this.cell / 4;
    padding = this.cell / 2;
    cx = cx - (radius * 2 + padding) * 2;
    cy = this.panelHeight + this.cell;
    var rat = 5;
    this.etc1 = new Circle(cx, cy+rat, radius, undefined);
    this.etc1.setColor("#2b2b2b");

    cx = cx + (radius * 2 + padding);
    this.etc2 = new Circle(cx, cy + rat, radius, undefined);
    this.etc2.setColor("#2b2b2b");

    cx = cx + (radius * 2 + padding);
    this.etc3 = new Circle(cx, cy + rat, radius, undefined);
    this.etc3.setColor("#2b2b2b");

    cx = cx + (radius * 2 + padding);
    this.etc4 = new Circle(cx, cy + rat, radius, undefined);
    this.etc4.setColor("#2b2b2b");

    cx = cx + (radius * 2 + padding);
    this.etc5 = new Circle(cx, cy + rat, radius, undefined);
    this.etc5.setColor("#2b2b2b");

    radius = (height - this.panelHeight - this.cell * 6) / 5;
    cx = width / 2 + (this.rightC.getCx() + this.rightC.getRadius()) / 2;
    cy = cy + radius * 2;
    this.soundC = new Circle(cx, cy, radius, this.btnimgpath);
  }

  loop(fun, time) {
    var this_ = this;
    setTimeout(function () {
      fun(this_);
      if (this_.over == false && this_.render==true) {
        this_.loop(fun, time);
      }
    }, time);
  }

  requestAnimation() {
    if (this.animal) {
      requestAnimationFrame(
        this.onDraw.bind(this),
        canvas
      )
    }
  }

  invalidate(){
    this.onDraw();
  }

  onDraw() {
    // console.log("onDraw");
    this.drawBackground();
    this.drawCube();
    this.drawPan(ctx);
    this.drawControl();
    this.drawMultipleCube();
  }

  drawBackground() {
    ctx.fillStyle = Contant.TETRIS_BG;
    let bgarr = this.bg;
    ctx.fillRect(bgarr[0], bgarr[1], bgarr[2], bgarr[3]);
  }

  drawCube(canvas) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';

    ctx.beginPath();
    //up
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.stroke();

    //down
    ctx.moveTo(0, this.panelHeight);
    ctx.lineTo(width, this.panelHeight);
    ctx.stroke();

    //left
    ctx.moveTo(0, 0);
    ctx.lineTo(0, this.panelHeight);
    ctx.stroke();

    //right
    ctx.moveTo(width, 0);
    ctx.lineTo(width, this.panelHeight);
    ctx.stroke();

    //middle
    ctx.moveTo(this.panelWidth - this.panelPadding/2, 0);
    ctx.lineTo(this.panelWidth - this.panelPadding/2, this.panelHeight);
    ctx.stroke();
    ctx.closePath();
  }

  drawControl() {
    ctx.fillStyle='#f0cd19';
    ctx.fillRect(0, parseInt(this.panelHeight + this.panelPadding * 2), width, height - parseInt(this.panelHeight + this.panelPadding * 2));

    this.leftC.drawSelf(ctx);
    this.rightC.drawSelf(ctx);
    this.upC.drawSelf(ctx);
    this.downC.drawSelf(ctx);
    this.palyC.drawSelf(ctx);
    this.soundC.drawSelf(ctx);

    ctx.fillStyle='#000000';
    this.leftT.drawSelf(ctx);
    this.rightT.drawSelf(ctx);
    this.upT.drawSelf(ctx);
    this.downT.drawSelf(ctx);

    var fontsize = 15;
    ctx.font = fontsize+"px 楷体";
    ctx.fillText("开始/暂停", this.palyC.getCx() - fontsize * 2.1, this.palyC.getCy() + this.palyC.getRadius() + fontsize);
    ctx.fillText("声音", this.soundC.getCx() - fontsize, this.soundC.getCy() + this.soundC.getRadius() + fontsize);

    this.etc1.drawColorSelf(ctx);
    this.etc2.drawColorSelf(ctx);
    this.etc3.drawColorSelf(ctx);
    this.etc4.drawColorSelf(ctx);
    this.etc5.drawColorSelf(ctx);
  } 

  initTouchEvent(){
    wx.onTouchStart(function (event) {
      tetris.press = true;
      var e = event.touches[0];
      var cx = e.screenX;
      var cy = e.screenY;
      var x = e.pageX;
      var y = e.pageY;
      tetris.control(x, y);
    });
    wx.onTouchMove(function (event) {

    });
    wx.onTouchEnd(function (event) {

    });
  }

  onClick(event){
    // console.log(event);
    this.press = true;
    var e = event.touches[0];
    var cx = e.clientX;
    var cy = e.clientY;
    var x = e.pageX;
    var y = e.pageY;
    this.control(x, y);
  }
  
  // onTouchEvent(event) {
  //   var cx = event.getX();
  //   var cy = event.getY();
  //   if (event.getAction() == MotionEvent.ACTION_DOWN) {
  //   } else if (event.getAction() == MotionEvent.ACTION_MOVE) {
  //     if (press) {
  //       this.controlMove(cx, cy);
  //     }
  //   } else if (event.getAction() == MotionEvent.ACTION_UP) {
  //     press = false;
  //     this.controlUp(cx, cy);
  //   } else if (event.getAction() == MotionEvent.ACTION_CANCEL) {
  //     press = false;
  //     this.controlUp(cx, cy);
  //   }
  //   return true;
  // } 
  
  // private long lastTime;

  // controlMove(cx, cy) {
  //   if (System.currentTimeMillis() - lastTime < 100) {
  //     return;
  //   }
  //   if (leftC.contains(cx, cy)) {
  //     //			multipleCube.setDirection(Direction.LEFT);
  //   } else if (upC.contains(cx, cy)) {
  //   } else if (rightC.contains(cx, cy)) {
  //     //			multipleCube.setDirection(Direction.RIGHT);
  //   } else if (downC.contains(cx, cy)) {
  //     if (!(over || pause)) {
  //       multipleCube.setDirection(Direction.DOWN);
  //     }
  //   }
  //   lastTime = System.currentTimeMillis();
  // }

  control(cx, cy) {
    if (this.leftC.contains(cx, cy)) {
      if (!(this.over || this.pause)) {
        this.palyGameSound(Contant.TETRIS_MOVE);
        this.multipleCube.setDirection(Direction.LEFT);
      }
    } else if (this.upC.contains(cx, cy)) {
      if (!(this.over || this.pause)) {
        this.palyGameSound(Contant.TETRIS_ROTATE);
        this.multipleCube.setType();
      }
    } else if (this.rightC.contains(cx, cy)) {
      if (!(this.over || this.pause)) {
        this.palyGameSound(Contant.TETRIS_MOVE);
        this.multipleCube.setDirection(Direction.RIGHT);
      }
    } else if (this.downC.contains(cx, cy)) {
      if (!(this.over || this.pause)) {
        this.palyGameSound(Contant.TETRIS_MOVE);
        this.multipleCube.setDirection(Direction.DOWN);
      }
    } else if (this.soundC.contains(cx, cy)) {
      this.soundOnOff = !this.soundOnOff;
    } else if (this.palyC.contains(cx, cy)) {
      if (this.over) {
        this.over = false;
        this.pan.scoreI = 0;
        this.pan.score.updateNumber(this.pan.scoreI);
        this.canStart = false;
        this.removeMessages(100);
        this.multipleCube.restart();
        this.updateUI();
        this.palyGameSound(Contant.TETRIS_PLAY);
      } else {
        this.pause = !this.pause;
        if (!this.pause) {
          this.removeMessages(100);
          this.updateUI();
        }
      }
    } else {

    }
  }

  // controlUp(cx, cy) {
      
  // }

    // private long updataTimeDruing = 500;
    // private int numEct = 0;
  updateUI() {
    if (this.over) {
      this.sendEmptyMessageDelayed(200, 1000);
      this.setEtcColor("stop");
      this.invalidate();
      return;
    } else {
      if (!this.pause) {
        this.multipleCube.upDatePosition();
        this.sendEmptyMessageDelayed(100, this.updataTimeDruing);
      } else {
        this.setEtcColor("pause");
        this.invalidate();
        return;
      }
    }
    this.setEtcColor("");
    this.numEct++;
    if (this.numEct > 4) {
      this.numEct = 0;
    }
    this.invalidate();
  }
  setEtcColor(stop) {
    if ("stop"==stop) {
      this.etc1.setColor(stopC);
      this.etc2.setColor(stopC);
      this.etc3.setColor(stopC);
      this.etc4.setColor(stopC);
      this.etc5.setColor(stopC);
    } else if ("pause"==stop) {
      this.etc1.setColor(pauseC);
      this.etc2.setColor(pauseC);
      this.etc3.setColor(pauseC);
      this.etc4.setColor(pauseC);
      this.etc5.setColor(pauseC);
    } else if (this.numEct == 0) {
      this.etc1.setColor(continueC);
      this.etc2.setColor(darkC);
      this.etc3.setColor(darkC);
      this.etc4.setColor(darkC);
      this.etc5.setColor(darkC);
    } else if (this.numEct == 1) {
      this.etc1.setColor(darkC);
      this.etc2.setColor(continueC);
      this.etc3.setColor(darkC);
      this.etc4.setColor(darkC);
      this.etc5.setColor(darkC);
    } else if (this.numEct == 2) {
      this.etc1.setColor(darkC);
      this.etc2.setColor(darkC);
      this.etc3.setColor(continueC);
      this.etc4.setColor(darkC);
      this.etc5.setColor(darkC);
    } else if (this.numEct == 3) {
      this.etc1.setColor(darkC);
      this.etc2.setColor(darkC);
      this.etc3.setColor(darkC);
      this.etc4.setColor(continueC);
      this.etc5.setColor(darkC);
    } else if (this.numEct == 4) {
      this.etc1.setColor(darkC);
      this.etc2.setColor(darkC);
      this.etc3.setColor(darkC);
      this.etc4.setColor(darkC);
      this.etc5.setColor(continueC);
    }
  }

  drawPan() {
    ctx.lineWidth=2.5;
    ctx.fillStyle='#000000';
    this.pan.drawSelf(ctx);
  } 

  sendEmptyMessageDelayed(what, delayMillis){
    let that = this;
    this.timer = setTimeout(function(){
      var msg = { what: what,obj:""};
      that.handleMessage(msg);
    }, delayMillis);
  }

  removeMessages(what){
    clearTimeout(this.timer);
  }
  
  handleMessage(msg) {
    switch (msg.what) {
      case 100:
        this.updateUI();
        break;
      case 200:
        this.canStart = true;
        break;
      case 300:
        if (this.multipleCube) {
          this.multipleCube.setDirection(Direction.DOWN);
        }
      case 400:
        this.pan.check();
        break;
      default:
        break;
    }
  }

  drawMultipleCube() {
    ctx.lineWidth = 2.5;;
    ctx.fillStyle = '#000000';
    this.multipleCube.drawSelf(ctx);
  }

  onShow() {
    var that = this;
    wx.getStorage({
      key: 'highestScoreI',
      success: function(res) {
        if (res.data) {
          let sco = res.data;
          let pan = that.pan;
          pan.highestScoreI = sco;
          pan.highestScore.updateNumber(sco);
        }
      },
    })
    // wx.getStorage({
    //   key: 'cubes',
    //   success: function (res) {
    //     let data = res.data;
    //     if (data) {
    //       let pan = that.pan;
    //       if (pan.cubes != null) {
    //         pan.cubes=[];
    //         pan.re = data.pan_re;
    //         pan.scoreI = data.pan_scorei;
    //         pan.score.updateNumber(pan.scoreI);
    //         pan.speedI = data.pan_speedi;
    //         pan.speed.updateNumber(pan.speedI);
    //         pan.checkPointI = data.pan_checkpointi;
    //         pan.checkPoint.updateNumber(pan.checkPointI);
    //         pan.reNum = data.pan_renum;
    //       }
    //     }
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // })
  }

  onHide() {
    this.removeMessages(100);
    let pan = this.pan;
    wx.setStorage({
      key: 'highestScoreI',
      data: pan.highestScoreI,
    })
    // if (pan != null && (!this.over)) {
    //   wx.setStorage({
    //     key: 'cubes',
    //     data: {
    //       "pan_cubes": pan.cubes,
    //       "pan_re":pan.re,
    //       "pan_scorei": pan.scoreI,
    //       "pan_speedi": pan.speedI,
    //       "pan_checkpointi":pan.checkPointI,
    //       "pan_renum": pan.reNum
    //     },
    //     success:function(){
    //       console.log('save success !')
    //     },
    //     fail:function(err){
    //       console.log(err)
    //     }
    //   })
    // }
  }

  gameOver(){
    var that = this;
    wx.showModal({
      title: 'GAME OVER',
      content: '【' + this.pan.scoreI +'分】，是否继续？',
      success(res) {
        if (res.confirm) {
          that.over = false;
          that.pan.scoreI = 0;
          that.pan.score.updateNumber(that.pan.scoreI);
          that.canStart = false;
          that.removeMessages(100);
          that.multipleCube.restart();
          that.updateUI();
          that.palyGameSound(Contant.TETRIS_PLAY);
        } else if (res.cancel) {
          wx.navigateBack();
        }
      }
    })
  }
}