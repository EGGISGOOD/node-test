var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	urlencodedParser = bodyParser.urlencoded({ extended:false});
	
/* GET index page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
 
/* GET login page. */
router.get('/login', function(req, res) {
	 res.render('login', { title: '用户登录' });
})

.post('/login',urlencodedParser,function(req,res){
	 var user={
        'username': 'admin',
        'password': '123456'
    }

    if(req.body.username === user.username && req.body.password === user.password){
		
		
        res.redirect('/home');
    }else{
		res.redirect('/login');
	}
});



/* GET home page. */
router.get('/home',function(req, res){
	 var user={
        username:'admin',
        password:'123456'
    }
	
	//redisCol.set("data", user, 1000);
    res.render('home', { title: 'Home', user: user });

})

router.get('/logout', function(req, res) {
    res.redirect('/');
});


router.get('/cookis',function(req,res){
	//res.cookie('haha', 'name1=value1&name2=value2', {maxAge:10*1000, path:'/', httpOnly:true});
	//console.log(123);

});


router.get('/session',function(req,res){
  var sess = req.session
  if (sess.views) {
    sess.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + sess.views + '</p>');
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
    res.end();
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});





router.get('/SessionRedis',function(req,res){
	if(!req.session.user){
	  req.session.user = 'aaaaaa';
	}

	res.end();
})

router.get('/getData', function(req, res) {

	var url = 'http://testd.ziines.com/api/getPostDetail/id/1058';
	
	request(url, function (error, response, body) {
	   if(!error && response.statusCode == 200){
			console.log(body);
		}
	})
});

module.exports = router;