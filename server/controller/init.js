'use strict'

/**
 * 改文件主要是初始应用
 */

let initDb = require('./initDb.js');


/**
 * 初始化函数
 * @return {[type]} [description]
 */
function init(){
	console.log(`init()`)
	// 初始化数据库
	initDb.initUsersDb();
	if(process.env.NODE_ENV === 'development'){
		require('../test/later-test.js');
	}
}


/////////////////////////////////////////////
module.exports = {
	init
}
