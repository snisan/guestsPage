var express = require('express');
var leaveMessage = require('./leaveMessage');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var app = express.createServer();
app.use(express.bodyParser());
app.register('.html',require('ejs'));
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

leaveMessage.connect(function(error)
{
	if(error) throw error;
});

app.on('close',function(errno)
{
	leaveMessage.disconnect(function(err){});
});
app.get('/',function(req,res){res.redirect('/index');});

app.get('/index',function(req,res,error)
{
	res.render('index.html',{title:"GuestsPage",postpath:'/index',message:leaveMessage.emptyMsg});
});
app.post('/index',function(req,res)
{
	if(req.body.name === "")
		{
			res.redirect('/index');
			return;
		}
	leaveMessage.add(req.body.name,req.body.message,function(error)
	{
		if(error) throw error;
		leaveMessage.allMessages(function(err,messages)
		{
			if(err)
				throw(err);
			else
			{
				res.render('viewmessages.html',{title:"GuestsPage",name:req.body.name,message:req.body.message,messages:messages});
			}
	});
});
});

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);
