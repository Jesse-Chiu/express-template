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
			let usersDb = await userDb.getUsersCount();
			if(usersDb > 5){
				return;
			}else{
				for(let i=0;i<10;i++){
					await userDb.addUser({
						userId: util.getRandomStr(4),
						password: util.getRandomStr(8,'Number'),
						info:{
							sex: Math.round(Math.random()),
							age:Number(util.getRandomStr(2,'Number')),
							email:`${util.getRandomStr(4)}@qq.com`
						}
					})
				}
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
