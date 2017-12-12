let express = require('express');
let router = express.Router();
const crypto = require("crypto");
const userDb = require('../db/mongodb/users.js');

// 默认首页
router.get('/', function(req, res) {
	if (req.session.isLogin) {
		res.redirect('/index');
	} else {
		res.render('login')
	}
});

/**
 * 默认首页
 * @param  {[type]} req  [description]
 * @param  {[type]} res) {	if         (req.session.isLogin) {		res.render('index', {			configObj: {				userId: req.session.user.userId,				currentTime: new Date().toLocaleString()			}		});	} else {		res.render('login')	}} [description]
 * @return {[type]}      [description]
 */
router.get('/index', function(req, res) {
	if (req.session.isLogin) {
		res.render('index', {
			configObj: {
				userId: req.session.user.userId,
				currentTime: new Date().toLocaleString()
			}
		});
	} else {
		res.render('login')
	}
});

/**
 * 登入页面
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) {	if         (req.session.isLogin) {		res.render('index', {			configObj: {				userId: req.session.user.userId,				currentTime: new Date().toLocaleString()			}		});	} else {		res.render('login')	}} [description]
 * @return {[type]}       [description]
 */
router.get('/login', function(req, res, next) {
	if (req.session.isLogin) {
		res.redirect('/index');
	} else {
		res.render('login')
	}
});

/**
 * 登入提交
 * @param  {Function} ) {		let       user [description]
 * @return {[type]}     [description]
 */
router.post('/login', (req, res, next) => {
	console.log(`/lgoin post: ${JSON.stringify(req.body)}`);
	let userId = req.body.userId;
	let password = req.body.password;
	let asyncFun = async function() {
		let user = await userDb.getUser(userId);
		// TODO hash
		if (user.password === password) {
			// Regenerate session when signing in
			// to prevent fixation
			req.session.regenerate(function() {
				// Store the user's primary key
				// in the session store to be retrieved,
				// or in this case the entire user object
				req.session.isLogin = true;
				req.session.user = user;
				res.render('index', {
					configObj: {
						userId: userId,
						currentTime: new Date().toLocaleString()
					}
				});
			});

		} else {
			res.send({
				code: -1,
				error: '密码错误'
			})
		}
	}

	asyncFun()
		.catch((error) => {
			res.send(error);
		})

});

/**
 * 登出
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) {             req.session.destroy(function(){    res.redirect('/');  });} [description]
 * @return {[type]}       [description]
 */
router.get('/logout', function(req, res, next) {
	req.session.destroy(function() {
		res.redirect('/login');
	});
});


module.exports = router;