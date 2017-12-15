'use strict'
let packageJson = require('../../package.json');
// 全局配置信息
let config = {
		version: packageJson.version,
};


if(process.env.NODE_ENV === 'development'){
	config.mongodbUrl = 'mongodb://kuku:kuku@127.0.0.1:27017/kuku';
}else{

}


console.log(`NODE_ENV: ${process.env.NODE_ENV} config: ${JSON.stringify(config)}`);

////////////////////////////////////////////////////////////////////////////
module.exports = config