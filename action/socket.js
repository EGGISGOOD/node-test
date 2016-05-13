var express = require('express'),
	router = express.Router();
	
router.get('/', function(req, res){

	res.send('<h1>Welcome Realtime Server</h1>');
	console.log('socket ok');
	
	res.end();
});


router.get('/show',function(req, res){
	console.log(req.session.user);
	console.log(req.session.id);
	res.render('show', { title: '∂‡»À¡ƒÃÏ “' });
	
	res.end();
	
})
	
module.exports = router;