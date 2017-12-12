var express = require('express');
var router = express.Router();

let userDb = require('../db/mongodb/users.js');
let util = require('../utils/util.js');

/**
 * 获取所有用户
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) {}          [description]
 * @return {[type]}       [description]
 */
router.get('/users', function(req, res, next) {
	let configObj = {
		start: req.query.start,
		count: req.query.count
	}
	let asyncFun = async function(){
		let usersData = await userDb.getUsers(configObj);
		let totalUsersNum = await userDb.getUsersCount();
		let sendData = {
			total: totalUsersNum,
			start: configObj.start,
			count: configObj.count,
			data: usersData
		}
		res.status(200).json(sendData);
	}
	asyncFun()
	.catch((error) => {
			console.error(error);
			res.status(404).send({
				error: 'NOT FOUND'
			})
		})
});

/**
 * userId 参数
 * @param  {[type]}   req     [description]
 * @param  {[type]}   res     [description]
 * @param  {Function} next    [description]
 * @return {[type]}           [description]
 */
router.param('userId', function(req, res, next, userId) {
	// console.log(`param -> userId: ${userId}`);
	userDb.getUser(userId)
		.then((result) => {
			if (result.length) {
				req.user = result[0];
				next();
			} else {
				res.status(404).send({
					error: 'NOT FOUND'
				})
			}
		})
		.catch((error) => {
			res.status(404).send({
				error: 'NOT FOUND'
			})
		})
});

/**
 * 查询具体某个用户
 * @param  {[type]} '/user/:userId' [description]
 * @param  {[type]} (req,res,next   [description]
 * @return {[type]}                 [description]
 */
router.get('/users/:userId', (req, res, next) => {
	// console.log(`get -> /user/:userId -> ${JSON.stringify(req.user)}`);
	res.status(200).json(req.user);
})

/**
 * 删除用户
 * @param  {[type]}   '/user/:userId' [description]
 * @param  {Function} (req,           res,          next) [description]
 * @return {[type]}                   [description]
 */
router.delete('/users/:userId', (req, res, next) => {
		// console.log(`delete -> /user/:userId -> ${JSON.stringify(req.user)}`);
		userDb.deleteUser(req.user.userId)
			.then((result) => {
				res.status(204).send({})
			})
			.catch((error) => {
				res.status(500).json({
					error: 'INTERNAL SERVER ERROR'
				})
			})
	})
	/**
	 * 更新用户数据
	 * @param  {[type]}   '/user/:userId' [description]
	 * @param  {Function} (req,           res,          next) [description]
	 * @return {[type]}                   [description]
	 */
router.put('/users/:userId', (req, res, next) => {
		// console.log(`put -> /user/:userId -> ${JSON.stringify(req.body)}`);
		userDb.updateUser(req.body)
			.then(() => {
				return userDb.getUser(req.body.userId)
			})
			.then((result) => {
				res.status(201).send(result[0]);
			})
			.catch((error) => {
				// 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
				res.status(422).send(error)
			})
	})
	/**
	 * 添加用户
	 * @param  {[type]}   '/user/:userId' [description]
	 * @param  {Function} (req,           res,          next) [description]
	 * @return {[type]}                   [description]
	 */
router.post('/users', (req, res, next) => {
	console.log(`post -> /user -> ${JSON.stringify(req.body)}`);
	userDb.addUser(req.body)
		.then((result) => {
			return userDb.getUser(req.body.userId)
		})
		.then((result) => {
			res.status(201).send(result[0])
		})
		.catch((error) => {
			// 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
			res.status(422).send(error)
		})
})


/////////////////////////////////////////
module.exports = router;