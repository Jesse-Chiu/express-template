'use strict'

/**
 * 该文件主要是利用 later 插件，计划安排定时任务
 */

const later = require('later');
const util = require('../utils/util');

function init(){
	test1();
	test2();
}

// 每隔 2 秒打印一次日志
function test1(){
	let sched = later.parse.text('every 2 second');
	util.executeSchedule(sched,0,(timeHandle)=>{
		console.log(new Date().toLocaleString());
	});
}

// 每日 14:45 和 14：46 执行回调函数
// 排除，周六和周日
function test2(){
	var sched = {
		// 每日 14:45 和 14：46 执行计划表
		schedules: [{h: [14], m: [45,46]}],
		// 每周六、日 时间: 注意这里的 7:表示周六 1:表示周日
		// 每周格式 [1-7](周日、周一、周二、... 周六)
		exceptions: [{dw:[7,1]}]
	}
	util.executeSchedule(sched,0,(timeHandle)=>{
		console.log(new Date().toLocaleString());
	});
}

////////////////////////////////////////////////
module.exports = {init}