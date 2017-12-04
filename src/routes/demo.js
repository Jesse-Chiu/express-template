/**
 * 本文文件主要是常用用到了代码实例
 */
let express = require('express');
let router = express.Router();

/**
 * form-data post demo
 */
router.get('/form-data-test', function(req, res) {
	console.log(`\nget -> /form-data-test -> body: ${JSON.stringify(req.query)}`);
	res.send(`<form method="post" enctype="multipart/form-data">
		<p>Title: <input type="text" name="title" /></p>
		<p><input type="submit" value="Submit" /></p></form>`);
});

let multer = require('multer')
let formData = multer(); // 用于处理 multipart/form-data 类型的表单数据,
router.post('/form-data-test', formData.none(), function(req, res) {
	console.log(`\npost -> /form-data-test -> body: ${JSON.stringify(req.body)}`);
});

module.exports = router;