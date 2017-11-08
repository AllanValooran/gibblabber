const updateDetails=require('./updateDetails.js');
const userCredentialsCollection=require('./mongo/userCredentialsCollection.js');
const gibber=require('./scrambler/gibber.js');

const createSocketSession=function(req,server,callback){
  const io = require('socket.io').listen(server);
  io.sockets.on('connection', function (socket){
    socket.on('status',function(data){
        let val=Number(gibber('dec',req.cookies.token));
        updateDetails.cookieUserExist(val,function(output){
          console.log(output);
          if(!output.status){
            callback('login');
          }
          else{
            callback('socket On completed');
          }
        })
        //updateCollection.updateStatus(req,data,function(responseData){
        //  })
    });
    socket.on('updateSearch',function(data){
      console.log('updateSearch',data);
      });
    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
      //	io.sockets.emit('updateusers', usernames);
        //socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
         //	socket.leave(socket.room);
    });
  });
}
module.exports=createSocketSession;
