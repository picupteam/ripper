var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',function(req,res,next){
	res.send('Register');
	//res.render('index', { title: 'Ripper' });	
});

module.exports = router;
