'use strict'
/**
 * users 用户数据表和操作函数
 */
const mongoose = require('./mongoose.js');


// Schema 结构
let usersSchema = new mongoose.Schema({
  userId:{
    type:String,
    default:'jessechiu'
  },
  password:{
    type:String,
    default:'0000'
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
  console.log(`addUser(${JSON.stringify(configObj)})`);
  let temp = {
    userId:configObj.userId,
    password:configObj.password
  };
  let newUser = new usersModel(temp);
  return new Promise((resolve,reject)=>{
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
function deleteUser(userId){
  console.log(`deleteUser(${userId})`);
  // 删除记录
  let conditions = {
    userId
  };
  return new Promise((resolve,reject)=>{
    usersModel.remove(conditions,(error,result)=>{
      if(error){
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
  console.log(`updateUser(${JSON.stringify(configObj)})`);
  let conditions = {
    userId:configObj.userId
  };
  let update = {
    $set: { "password": configObj.password }
  };
  return new Promise((resolve,reject)=>{
    usersModel.update(conditions, update, null, function(error,raw) {
      if (error) {
        console.log(`updateUser() error: ${JSON.stringify(error)}`);
        return reject(error);
      }
      console.log('updateUser() success',raw);
      return resolve(raw);
    });
  });
}

/**
 * 根据 userId 获取用户信息
 * @param  {[type]} userId [description]
 * @return {[type]}        [description]
 */
function getUser(userId){
  console.log(`getUser(${userId})`);
  let conditions = {
    userId
  };
  return new Promise((resolve,reject)=>{
    usersModel.find(conditions,(error,result)=>{
      if(error){
        console.log(`getUser() error: ${JSON.stringify(error)}`);
        return reject(error);
      }
      console.log(`getUser() success: ${JSON.stringify(result)}`);
      return resolve(result);
    })
  });
}

/**
 * [getAllUsers description]
 * @param  {[type]} configObj [description]
 * @return {[type]}           [description]
 */
function getAllUsers(){
  console.log(`getAllUsers()`);

  return new Promise((resolve,reject)=>{
    usersModel.find((error,result)=>{
      if(error){
        console.log(`getAllUsers() error: ${JSON.stringify(error)}`);
        return reject(error);
      }
      console.log(`getAllUsers() success: ${JSON.stringify(result)}`);
      return resolve(result);
    })
  });
}

//-----------------------------------------------
// addUser({userId:'kuku',password:new Date()});
// deleteUser('kuku');
// getUser('kuku')
// getAllUsers();
// updateUser({userId:'rxf0',password:new Date()});
//////////////////////////////////////////////////////////////////
module.exports = {
  addUser, // 添加用户
  deleteUser, // 删除某个用户
  getUser,// 获取具体某个用户
  getAllUsers, // 获取所有用户信息
  updateUser,// 更新摸某个用户信息
}
