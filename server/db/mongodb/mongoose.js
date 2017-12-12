'use strict'

let config = require('../../config/config.js');

// mongoose 链接
let mongoose = require('mongoose');
// 连接数据库，如果数据库不存在则自动创建一个
mongoose.connect(config.mongodbUrl,{useMongoClient: true});

// 链接错误
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// 数据成功打开时回调
db.once('open', function() {
  console.log(`mongodb are connected!`);
});


//////////////////////////////////////////////////////////
module.exports = mongoose;