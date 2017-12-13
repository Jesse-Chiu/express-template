>整合使用 express 框架常用的中间件工程,目的是使用该工程可以快速开始项目开发
**建议每隔一个月检查下依赖插件是否有新版本，保持所有依赖包都是最新版本**


## 开发环境(`process.env.NODE_ENV === 'development'`)
- 不对请求 api 进行权限验证
- 创建的数据库 `kuku`,数据库用户名和密码 `kuku:kuku`
- 会自动初始化 11 用户数据


## 使用到的组件
- [multer](https://www.npmjs.com/package/multer) 文件上传插件
- [express-session](https://www.npmjs.com/package/express-session) session 插件
- [ejs](https://www.npmjs.com/package/ejs) ejs 模板
- [body-parser](https://www.npmjs.com/package/body-parser) 用来解析 post 请求体(支持 json、url-encode)
- [connect-redis](https://www.npmjs.com/package/connect-redis) 用于存储 session 的 redis 插件
- [axios](https://www.npmjs.com/package/axios) Promise based HTTP client for the browser and node.js
- [connect-mongo]() 用于存储 session 的 mongo 插件
- [mongodb]() mongodb 数据库插件
- [mongoose]() 在 mongodb 基础上封装一层更易于操作的接口
- [cors](https://www.npmjs.com/package/cors#configuration-options) 用于配置 cors 跨域
- [later](https://www.npmjs.com/package/later) 定时任务解决方案
