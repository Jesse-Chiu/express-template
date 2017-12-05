let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(`/ req.session.viewCount: ${req.session.viewCount}`);
	if(req.session.viewCount){
		++req.session.viewCount;
	}else{
		req.session.viewCount = 1;
	}
  res.render('index', { configObj:{
  	currentTime: new Date().toLocaleString(),
  	viewCount:req.session.viewCount
  } });
});

module.exports = router;
