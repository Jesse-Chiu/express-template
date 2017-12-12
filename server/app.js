let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let cors = require('cors');
let config = require('./config/config.js');
let initDb = require('./controller/initDb.js');
initDb.initUsersDb();

// pass the express to the connect redis module
// allowing it to inherit from session.Store
// let RedisStore = require('connect-redis')(session);
let MongoStore = require('connect-mongo')(session);

let app = express();

// view engine setup
// 这里设置熏染的视图文件后缀名
app.engine('.html', require('ejs').__express);
// 这里设置熏染的视图文件目录
app.set('views', path.join(__dirname, 'views'));
// 这里设置熏染的视图文件类型，这样使用 render('index',{xxx}) 时就不需要写后缀名
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
// querystring library (when false) or the qs library (when true)
app.use(bodyParser.urlencoded({
  extended: false
}));
// 注意这里使用 cookie-parser 中间件，
// 如果在 res.cookie 设置 signed:true，在这里必需传人一个 secret 用于签名
app.use(cookieParser('3d48ed43942bjesse95cf34b1419a2fe'));
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// 可以配置虚拟路径
app.use('/xxx/static', express.static(path.join(__dirname, 'public')));

// 设置 session
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  // cookie: {maxAge:  1000*60*60*24*7},// 设置有效时间 7 天
  // store: new RedisStore, // session 保存在 redis 中
  store: new MongoStore({
    url: config.mongodbUrl
  }), // session 保存在 mongo 中
  secret: 'jesse chiu' // 只在 https 时有用
}));

// 使用 cors 插件统一设置 CORS 信息
app.use(cors());
// 或者使用原生配置
// app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//  // res.header("Access-Control-Allow-Headers", "jesse");
//  // res.header("Access-Control-Allow-Origin", "http://test.jessechiu.com");
//  next();
// });


//---------------路由配置文件------------------
app.use('/', require('./routes/login'));
/**
 * 权限验证，确保只用登入成功后才能操作后面的接口
 * 注意: 位置必须其它接口之前，登入接口之后
 * @param  {[type]} (req, res,          next [description]
 * @return {[type]}       [description]
 */
app.use((req, res, next) => {
  console.log(`app.use() ${req.session.isLogin}`);
  if (req.session.isLogin) {
    return next();
  }
  // 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）
  res.status(401).send({code:401,error:'Unauthorized'});
})
app.use('/', require('./routes/users'));
app.use('/', require('./routes/demo'));


//---------------错误处理-----------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    error: JSON.stringify(err)
  });
});

module.exports = app;