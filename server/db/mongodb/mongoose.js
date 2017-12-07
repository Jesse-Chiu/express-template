'use strict'

let config = require('../../config/config.js');

// mongoose 链接
let mongoose = require('mongoose');
mongoose.connect(config.mongodbUrl,{useMongoClient: true});

// 链接错误
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log(`mongodb are connected!`);
});


//////////////////////////////////////////////////////////
module.exports = mongoose;

db.createUser({
	user: "kuku", // 用户名
	pwd:"kuku",// 密码
	roles:[{role:"readWrite",db:"kuku"}] //超级管理员
})