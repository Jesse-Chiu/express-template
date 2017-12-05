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
		<p>Photo: <input type="file" name="photo" /></p>
		<p><input type="submit" value="Submit" /></p></form>`);
});

let multer = require('multer');
let storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	filename: function(req, file, cb) {
		// 使用原来的文件名保存
		cb(null, `${Date.now()}-${file.originalname}`)
	}
})

let upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 // 设置上传文件大小为 1M})
	}
});

router.post('/form-data-test', upload.single('photo'), function(req, res) {
	console.log(`\npost -> /form-data-test -> req.file`, req.file);
	console.log(`\npost -> /form-data-test -> body: ${JSON.stringify(req.body)}`);
	res.send('good job!!!');
});


//////////////////////////////////////
module.exports = router;