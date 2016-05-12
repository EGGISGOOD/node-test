var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 




event.on('diaoni',function(){
	 var data = {  
		id:2,  
	 };

	 curl(data);
});
	
	
function curl(data){
	var http = require('http'),
	data = require('querystring').stringify(data);  
	
	var options = { 
		hostname: '127.0.0.1', 
		port: 80, 
		path: '/test/callback.php', 
		method: 'POST',
		headers: {  
				"Content-Type": 'application/x-www-form-urlencoded',  
				"Content-Length": data.length  
		}  
	};
	
    var req = http.request(options, function (serverFeedback) {  

        if (serverFeedback.statusCode == 200) {  
            var body = "";  
            serverFeedback.on('data', 
				function (data) {
					body += data;
			})

        } 
    });  
	
    req.write(data + "\n");  
    req.end();  
}








setTimeout(function(){
	event.emit('diaoni');
},1000);	
