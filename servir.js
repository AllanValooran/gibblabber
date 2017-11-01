const http=require('http');
const express=require('express');
const app=express();
const server=http.createServer(app);
server.listen(8080, "127.0.0.1",()=>{
  console.log('listening 8080');
});

app.get('/',(req,res)=>{
  app.use(express.static(__dirname))
  res.sendFile(__dirname + '/index.html');
})

var io = require('socket.io').listen(server);
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
