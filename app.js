var express=require("express"); 
var bodyParser=require("body-parser"); 
var path = require('path');

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

var app=express() 

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.post('/sign_UP', function(req,res){ 
	
	var email =req.body.email; 
	var pass = req.body.password; 
	var name = req.body.name; 
	//var lastname = req.body.lastname; 
	var phone =req.body.phone; 
	var add = req.body.address; 
	var add2 = req.body.address1;
	//var city = req.body.city;
	//var state = req.body.state;

	var data = { 
		"email":email, 
		"password":pass, 
		"firstname": name, 
		//"lastname": lastname, 
		"phone":phone ,
		"add":add,
		"add2":add2,
		//"city":city,
		//"state":state
	} 
db.collection('details').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Record inserted Successfully"); 
			
	}); 
		
	return res.redirect('signup_success.html'); 
}) 

app.get('/',function(req,res){ 
	res.sendFile('index.html'); 
	});

/*app.get('/registration1',function(req,res){ 
		res.sendFile(path.join(__dirname,'./public','/registration1.html')); 
		});

app.get('/registration2',function(req,res){ 
			res.sendFile(path.join(__dirname,'./public','/registration2.html')); 
			});*/

app.get('/registration',function(req,res){ 
			res.sendFile(path.join(__dirname,'./public','/registration.html')); 
			});
app.get('/Home',function(req,res){ 
	res.sendFile(path.join(__dirname,'./public','/Home.html')); 
	});
	

app.listen(8000, function(err)
{
  if(!err)
  {
    console.log("app is running at 8000");
  }
});
