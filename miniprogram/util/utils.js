import 'base64'

/**
 * 获取当前时间戳
 */
function getCurrentTimestamp(){
  //获取当前时间戳
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  return timestamp;
}
/**
 * 获取年
 */
function getYear(timestamp){
  var date = new Date(timestamp * 1000);
  var year = date.getFullYear();
  return year;
}
/**
 * 获取月
 */
function getMonth(timestamp) {
  var date = new Date(timestamp * 1000);
  var month = date.getMonth()+1;
  return month;
}
/**
 * 获取日
 */
function getDate(timestamp) {
  var date = new Date(timestamp * 1000);
  var date = date.getDate();
  return date;
}
/**
 * 获取年
 */
function getDateStr(timestamp) {
  var date = new Date(timestamp * 1000);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var date = date.getDate();
  return year+'年' + month +'月'+ date+'日';
}
function idSameDate(update_time){
  var timestamp = Date.parse(new Date())/1000;
  var dd = 60*60;
  var dis = (timestamp-update_time)/dd;
  return dis<24;
}
/**
 * 获取年
 */
function getDateText(timestamp) {
  var date = new Date(timestamp * 1000);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  if(month<10){
    month = '0' + month;
  }
  var date = date.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  return year + '' + month + date;
}
function getDateString(){
  return getDateText(getCurrentTimestamp());
}
module.exports = {
  getCurrentTimestamp: getCurrentTimestamp,
  idSameDate: idSameDate,
  getDateString: getDateString
}