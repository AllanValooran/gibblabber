const updateDetails=require('./updateDetails.js');
const userInfoCollection=require('./mongo/userInfoCollection.js');
const userCredentialsCollection=require('./mongo/userCredentialsCollection.js');
const gibber=require('./scrambler/gibber.js');

const createSocketSession=function(req,server,callback){
  const io = require('socket.io').listen(server);
  io.sockets.on('connection',function(socket){
    socket.on('status',function(data){
        let val=Number(gibber('dec',req.cookies.token));
        updateDetails.cookieUserExist(val,function(output){
          if(!output.status){
            callback('login');
          }
          else{
            let dbInstance=output.dbInstance;
            let username=output.result;
            userInfoCollection.updateStatus(username,data,dbInstance,function(dataOutput){
              if(!dataOutput.status){
                socket.emit('errorOccured','status updation failed');
              }
              else{
                if(dataOutput.data=='Success'){
                  socket.emit('statusChanged',data);
                }
                else{
                  socket.emit('errorOccured','status updation failed');
                }
              }
            });

          }
        })
        //updateCollection.updateStatus(req,data,function(responseData){
        //  })
    });
    socket.on('searchGibberMates',function(data){
      let val=Number(gibber('dec',req.cookies.token));
      updateDetails.cookieUserExist(val,function(output){
        if(!output.status){
          callback('login');
        }
        else{
          let dbInstance=output.dbInstance;
          let username=output.result;
          userInfoCollection.searchUsers(data,dbInstance,function(dataOutput){
            if(!dataOutput.status){
              socket.emit('errorOccured','searchGibberMates failed');
            }
            else{
              if(dataOutput.data=='Success'){
                socket.emit('searchResults',JSON.stringify(dataOutput.result));
              }
              else{
                socket.emit('errorOccured','status updation failed');
              }
            }
          });

        }
      })
    })

    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
      //	io.sockets.emit('updateusers', usernames);
        //socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
         //	socket.leave(socket.room);
    });
  });
}
module.exports=createSocketSession;
