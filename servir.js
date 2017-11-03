const http=require('http');
const express=require('express');
const app=express();
const server=http.createServer(app);
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

server.listen(8080, "127.0.0.1",()=>{
  console.log('listening 8080');
});
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
 app.use(bodyParser.urlencoded({
     extended: true
 }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname));

app.get('/login',(req,res)=>{
  res.sendFile(__dirname + '/login.html');
})

app.post('/authenticate',(req,res)=>{
  var cookie = req.cookies.token;
  var login=req.body.value;
   if (cookie === undefined){
    res.cookie('token',login, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  }
  else{
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  }
  var output={};
  output.status=true;
  res.send(JSON.stringify(output));
})

app.get('/chat',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
})

const io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket){

  socket.on('established', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		//io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    console.log('establishing socket in server');
    socket.emit('updaterooms');
	});

  //socket.emit('updaterooms', rooms, newroom);

// when the user disconnects.. perform this
	socket.on('disconnect', function(){
	//	io.sockets.emit('updateusers', usernames);
		//socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	//	socket.leave(socket.room);
	});
});
