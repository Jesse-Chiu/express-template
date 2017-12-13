/**
 * 工具函数
 */
const crypto = require("crypto");
const later = require('later');

/**
 * 创建一个错误异常信息
 * @param  {[type]} status  [description]
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function createError(status, message) {
	var err = new Error(message);
	err.status = status;
	return err;
}


/**
 * 获取制定长度的随机字符串
 * type: Number : 只生成数字字符串
 * @param {*} num 
 */
function getRandomStr(num, type) {
  let sourceStr = 'abcdefghijklmnopqrstuvwxyz9876543210';
  if (type === 'Number') {
    sourceStr = '9876543210';
  }
  let strLength = sourceStr.length;
  let result = '';
  let index = 0;
  for (index = 0; index < num; index++) {
    result += sourceStr.charAt(Math.floor(Math.random() * strLength));
  }
  // console.log(`getRandomStr(): num:${num} result:${result}`);
  return result;
}

/**
 * 获取 sha256 hash 值
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function getSha256(str){
  let sha256 = crypto.createHash("sha256");
  let result = sha256.update(str).digest("hex");
  console.log(`getSha256() :${result}`);
  return result;
}

/**
 * 执行计划表
 * @param  {schedule}   schedule 计划表
 * @param  {Number}   type 0: 无限循环执行计划表，1:只执行一次计划表
 * @param  {Function} executeFun 计划表执行的函数 
 */
function executeSchedule(schedule,type,executeFun){
  console.log(`executeSchedule,(${JSON.stringify(schedule)},${type})`);
  console.log(new Date().toLocaleString());
  // 按照本地时间执行
  later.date.localTime();
  // 打印最近 10 次执行时间表
  let occurrences = later.schedule(schedule).next(10);
  occurrences.forEach((item,index)=>{
    console.log(`${index}: ${item}`);
  });

  let timeHandle = null;
  if(type){
    // 只执行一次计划表
    timeHandle = later.setTimeout(()=>{
      executeFun(timeHandle)
    }, schedule);
  }else{
    // 无限循环执行计划表
    timeHandle = later.setInterval(()=>{
      executeFun(timeHandle)
    }, schedule);
  }
}
/////////////////////////////////////////
module.exports = {
	createError,  // 创建一个错误异常
	getRandomStr, // 获取指定长度随机字符串 
  getSha256, // 获取 sha256 hash 加密值
  executeSchedule,// 设置计划执行表
}