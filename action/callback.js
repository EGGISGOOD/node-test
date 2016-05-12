var express = require('express'),
	router = express.Router(),
	redis = require('redis'),
    client = redis.createClient('6379','192.168.30.129');
	bodyParser = require('body-parser'),
	schedule = require("node-schedule"),
	urlencodedParser = bodyParser.urlencoded({ extended:false}),
	request = require('request');

	


router.get('/', function(req, res) {
  var rule = new schedule.RecurrenceRule();
	rule.second = 1;
	var i = 0 
	
	var j = schedule.scheduleJob(rule, function(){
		
		
		if(i == 10) i = 0 ;
		
		client.get('callback:'+i,function(err,rep){
		
			var data =  JSON.parse(rep.toString());	
			console.log(data);
			//console.log(data.url);
			console.log(data.id);
			var url ='http://127.0.0.1/test/callback.php';
			//console.log(url);
			request.post(url,{
			  form : {
				id: data.id,
			  }
			});	
		})
		
		i++;
	});
	

   res.end();
});
	
module.exports = router;