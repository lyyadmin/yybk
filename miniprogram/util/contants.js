const appid = 'wx2cdc21f032015c7c';
const secret = 'e20f9d1860a66cddd03d245bec5d9d4d';
const jscode2session = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret +'&grant_type=authorization_code&js_code=';
module.exports = {
  jscode2session: jscode2session
}