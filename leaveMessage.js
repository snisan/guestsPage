var dburl = 'mongodb://localhost/test';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new Schema(
		{
			name: String,
			message:	String,
		    created:	{type:Date,default:Date.now}
		});
mongoose.model('message',MessageSchema);
var guestMessage = mongoose.model('message');


exports.emptyMsg = {name:"",message:""};


exports.connect = function(callback)
{
	mongoose.connect(dburl);
};

exports.disconnect = function(callback)
{
	mongoose.disconnect(callback);
};


exports.add = function(name,message,callback)
{
	var newMessage = new guestMessage();
	newMessage.name = name;
	newMessage.message = message;
	newMessage.save(function(err){
		if(err)
		{
			callback(err);
		}
		else
		{
			callback(null);
		}
	});
};


exports.allMessages = function(callback)
{
	guestMessage.find({},callback).sort('created',-1);
};
