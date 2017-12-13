'use strict'
/**
 * users 用户数据表和操作函数
 */
const mongoose = require('./mongoose.js');
const util = require('../../utils/util.js');


// Schema 结构
let usersSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'kuku',
    unique: true // 保证该属性唯一性
  },
  password: {
    type: String,
    default: '0000'
  },
  creatTime: {
    type: Date,
    default: new Date()
  },
  info: {
    type: Object,
    default: {}
  }
});

// model
let usersModel = mongoose.model('users', usersSchema);

//////////////////////////////////////////////////////////////////////////

/**
 * 添加用户
 * @param {[type]} addMarkTime [description]
 * @param {[type]} marksItem   [description]
 */
function addUser(configObj) {
  configObj.password = util.getSha256(configObj.password);
  console.log(`addUser(${JSON.stringify(configObj)})`);

  let newUser = new usersModel(configObj);
  return new Promise((resolve, reject) => {
    newUser.save(function(error) {
      if (error) {
        console.log(`addUser() error: ${JSON.stringify(error)}`);
        return reject(error);
      }
      console.log('addUser() success');
      return resolve();
    });
  });
}

/**
 * 根据用户名删除用户
 * @param  {[type]} userId [description]
 * @return {[type]}        [description]
 */
function deleteUser(userId) {
  console.log(`deleteUser(${userId})`);
  // 删除记录
  let conditions = {
    userId
  };
  return new Promise((resolve, reject) => {
    usersModel.remove(conditions, (error, result) => {
      if (error) {
        console.log(`deleteUser() error: ${JSON.stringify(error)}`);
        return reject(error);
      }
      console.log(`deleteUser() success: ${JSON.stringify(result)}`);
      return resolve(result);
    })
  });
}

/**
 * 根据 userId 修改信息
 * @param  {[type]} userId [description]
 * @return {[type]}        [description]
 */
function updateUser(configObj) {
  let conditions = {
    userId: configObj.userId
  };
  configObj.password && (configObj.password = util.getSha256(configObj.password));
  console.log(`updateUser(${JSON.stringify(configObj)})`);
  let update = {
    // 使用 $set 操作符可以只更新存在的数据
    $set: configObj
  };
  let options = {
    multi: false, // 是否更新所有找到的数据
    upsert: true // 如果不存在则创建一个
  };
  return new Promise((resolve, reject) => {
    // 参考: http://mongoosejs.com/docs/api.html#model_Model.update
    usersModel.update(conditions, update, options, function(error, raw) {
      if (error) {
        console.log(`updateUser() error: ${JSON.stringify(error)}`);
        return reject(error);
      }
      console.log('updateUser() success', raw);
      return resolve(raw);
    });
  });
}

/**
 * 根据 userId 获取用户信息
 * @param  {[type]} userId [description]
 * @return {[type]}        [description]
 */
function getUser(userId) {
  console.log(`getUser(${userId})`);
  let conditions = {
    userId
  };
  return new Promise((resolve, reject) => {
    // 如果使用 findOne 返回的是一个对象，不是数组
    usersModel.findOne(conditions, (error, result) => {
      if (error) {
        console.log(`getUser() error: ${JSON.stringify(error)}`);
        return reject(error);
      }
      console.log(`getUser() success: ${JSON.stringify(result)}`);
      return resolve(result);
    })
  });
}

/**
 * 更具条件查询数据
 * @param  {[type]} configObj [description]
 * @return {[type]}           [description]
 */
function getUsers(configObj) {
  console.log(`getUsers(${JSON.stringify(configObj)})`);
  configObj = configObj || {};
  let options = {
    skip: configObj.start,
    limit: configObj.count,
    sort: {creatTime: 1} // -1 降序，1 升序
  }
  return new Promise((resolve, reject) => {
    usersModel.find({},null,options,(error, result) => {
      if (error) {
        console.log(`getUsers() error: ${JSON.stringify(error)}`);
        return reject(error);
      }
      console.log(`getUsers() success: ${JSON.stringify(result)}`);
      return resolve(result);
    })
  });
}

/**
 * 获取用户表数据条数
 * @return {[type]} [description]
 */
function getUsersCount() {
  console.log(`getUsersCount()`);
  return new Promise((resolve, reject) => {
    usersModel.count((error, result) => {
      if (error) {
        console.log(`getUsersCount() error: ${JSON.stringify(error)}`);
        return reject(error);
      }
      console.log(`getUsersCount() success: ${JSON.stringify(result)}`);
      return resolve(result);
    })
  });
}

//-----------------------------------------------
(async function(){
  // await getUsersCount();
  // await addUser({userId:'kuku',password:'1234',info:{age:88}});
  // await getUsers();
  // await getUsers({start:1,count:2});
  // await updateUser({userId:'kuku',password:'8888'});
  // await getUser('kuku');
  // await deleteUser('kuku')
})()
//////////////////////////////////////////////////////////////////
module.exports = {
  addUser, // 添加用户
  deleteUser, // 删除某个用户
  getUser, // 获取具体某个用户
  getUsers, // 获取所有用户信息
  updateUser, // 更新摸某个用户信息
  getUsersCount,// 获取表数据长度
}