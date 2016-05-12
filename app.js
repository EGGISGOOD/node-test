//外部model 引入
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var	session = require('express-session');
var	RedisStore = require('connect-redis')(session);
var app = express();
//var request = require('request');


//config
var redisConfig = {
	host : '192.168.30.129',
	post : '6379'
};

var urlencodedParser = bodyParser.urlencoded({ extended:false});

//路由 引入
var index = require('./action/index');
var callback = require('./action/callback');
//var users = require('./action/users');
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html'); //转换 HTML 模式


app.use(cookieParser('ccc'));	

app.use(session({
    store: new RedisStore(redisConfig),
    secret: 'ccc'
}));



app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no')) // handle error
  }
  next() // otherwise continue
})


//set 中间件
app.use(express.static('public'));
app.use('/', index);
app.use('/callback', callback);
//app.use('/users', users);



 ///catch 404 and forward to error handler
app.use(function(req, res, next) {
   // var err = new Error('Not Found');
   // err.status = 404;
   // next(err);
   console.log(404);
   res.end();
});
 
/// error handlers
 
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
 
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
 
//exit
var server = app.listen(8081,
	function(){
	  var host = server.address().address;
	  var port = server.address().port;

	  console.log("应用实例，访问地址为 http://%s:%s", host, port)
	}
)