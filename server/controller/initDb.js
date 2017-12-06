'user strict';
/**
 * 初始化数据库
 */
let userDb = require('../db/mongodb/users.js');
let util = require('../utils/util.js');

/**
 * 初始化数据库
 * @return {[type]} [description]
 */
function initDb(){
	initUsersDb();
}

/**
 * 初始化用户数据库表
 * @return {[type]} [description]
 */
function initUsersDb(){
	if(process.env.NODE_ENV === 'development'){
		(async function(){
			let usersDb = userDb.addUser();
			if(usersDb.length > 5){
				return;
			}else{
				await userDb.addUser({
					userId: util.getRandomStr(4),
					password: util.getRandomStr(8,'Number')
				})
			}
		})()
	}else{

	}
}

//////////////////////////
module.exports = {
	initDb,
	initUsersDb
};
