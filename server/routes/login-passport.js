'use strict'

/**
 * 使用 passport 中间件进行授权,支持用户名名和账号、github、LinkedIn 登入
 */

let express = require('express');
let router = express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let GithubStrategy = require('passport-github').Strategy;
let LinkedinStrategy = require('passport-linkedin').Strategy;
const userDb = require('../db/mongodb/users.js');
const util = require('../utils/util.js');

/**
 * 配置实用用户名和密码方式认证
 * @param  {[type]}   username   [description]
 * @param  {[type]}   password [description]
 * @param  {Function} done)    {		let       asyncFun [description]
 * @return {[type]}            [description]
 */
passport.use('local', new LocalStrategy(
	function(username, password, done) {
		console.log(`passport: ${username} ${password}`);
		let asyncFun = async function() {
			// 从数据中获取用户信息
			let user = await userDb.getUser(username);
			if (user.password === util.getSha256(password)) {
				return done(null, user);
			} else {
				return done(null, false, {
					message: 'Incorrect password'
				});
			}
		}
		asyncFun()
			.catch((error) => {
				return done(null, false, {
					message: 'Incorrect username.'
				});
			})
	}
));

// 这里是把 user 存储到 session 中
passport.serializeUser(function(user, done) {
	console.log(`serializeUser() ${JSON.stringify(user)}`);
	done(null, user);
});
// 这里是把 user 存储到 req.user 中
passport.deserializeUser(function(user, done) {
	// console.log(`deserializeUser() ${JSON.stringify(user)}`);
	done(null, user);
});

// 默认首页
router.get('/', isLoggedIn);
// 登入页面
router.get('/login', isLoggedIn);
// 首页
router.get('/index', isLoggedIn);

// 登入提交
router.post('/login', passport.authenticate('local', {
	successRedirect: '/index',
	failureRedirect: '/'
}));

// 登出
router.get('/logout', function(req, res, next) {
	// 清除 session 值操作
	req.logout();
	res.redirect('/login');
});

/**
 * 封装判断是否已经登入
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {Boolean}       [description]
 */
function isLoggedIn(req, res, next) {
	console.log(`isLoggedIn() -> url:${req.url} req.user: ${JSON.stringify(req.user)}`);
	if (req.isAuthenticated()) {
		res.render('index', {
			configObj: {
				/*req.user.username(github) */
				username: req.user.userId || req.user.username,
				currentTime: new Date().toLocaleString()
			}
		});
	} else {
		res.render('login')
	}
}

//--------------------------------------------------------------
// 配置使用 github 方式登入
passport.use(new GithubStrategy({
	// 参考 https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/
	clientID: "badd6de6255abda00790",
	clientSecret: "86cfec96d9370f6f3f22510a9cd7c05c70932ae3",
	// 认证号回调地址
	callbackURL: "http://localhost/auth/github/callback"
}, function(accessToken, refreshToken, profile, done) {
	done(null, profile);
}));

// 鉴权成功跳转页面
router.get('/auth/github/callback', passport.authenticate("github", {
	successRedirect: '/index',
	failureRedirect: '/'
}));

// 使用 github 登录
router.get("/auth/github", passport.authenticate("github", {
	scope: "email"
}));


//------------------------------------------------------------
// 使用 linkedin 方式登入
passport.use(new LinkedinStrategy({
    consumerKey: "78z1m6c14qmwso",
    consumerSecret: "ErbqsdtiaCNfJjWz",
    callbackURL: "http://localhost/auth/linkedin/callback",
    userAgent: 'localhost'
},function(accessToken, refreshToken, profile, done) {
    done(null, profile);
}));

// 鉴权成功跳转页面
router.get('/auth/linkedin/callback', passport.authenticate("github", {
	successRedirect: '/index',
	failureRedirect: '/'
}));

// 取消
router.get('/auth/linkedin/cancel',(req,res,next)=>{

});

// 使用 linkedin 登录
router.get("/auth/linkedin", passport.authenticate("linkedin", {}));

/////////////////////////////////////////////////
module.exports = router;