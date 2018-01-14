// var express = require('express');
// var app = express();
// var fs = require("fs");
// var http = require('http').Server(app);
// var io = require('socket.io')(server);

// var server = app.listen(8081, function () {
// 	var host = server.address().address
// 	var port = server.address().port
// 	console.log("Example app listening at http://%s:%s", host, port)
// });

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser')



server.listen(8081, function() {
  console.log('server up and running at 8081 port');
});


class Queue
{
    constructor(){
        this.items = [];
    }

	enqueue(element){    
		this.items.push(element);
	}

    dequeue(){
	    if(this.isEmpty())
	        return "Underflow";
	    return this.items.shift();
	}

	front(){
    	if(this.isEmpty())
        return "No elements in Queue";
    	
    	return this.items[0];
	}
	isEmpty(){
    	return this.items.length == 0;
	}

	printQueue(){
	    var str = "";
	    for(var i = 0; i < this.items.length; i++)
	        str += this.items[i] +" ";
	    return str;
	}
	getSize(){
		return this.items.length;
	}
}

var DoctorQueue = new Queue();
var PatientQueue = new Queue();

// app.get('/get', function (req, res) {
//    	console.log("hey");
// })
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.post('/addDoctor', function(request, response){
  	//console.log("adding a Doctor");
  	console.log(request.body);
  	DoctorQueue.enqueue(request.body);
  	response.send(request.body);    // echo the result back
  	console.log(DoctorQueue.getSize());
  	check();
});

app.post('/addPatient', function(request, response){
  	response.send(request.body);    // echo the result back
    console.log("adding a patient");
  	PatientQueue.enqueue(request.body);
  	check();
});

io.on('connection', function(socket){
  io.emit('notification', {
	  message: 'new customer'
	});
});
io.on('test', function(data){
	console.log("received");
})

check = function(){
	if(DoctorQueue.getSize()!=0 && PatientQueue.getSize()!=0){
		console.log("Found a match");
		data = [];
		data[0] = DoctorQueue.dequeue();
		data[1] = PatientQueue.dequeue();
		io.emit('foundPatient', data);
		//DoctorQueue.dequeue();
		//PatientQueue.dequeue();
	}
	else
		console.log("not enough candidates to help");
}



