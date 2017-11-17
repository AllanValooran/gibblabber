const updateDetails=require('./updateDetails.js');
const initiateChat=require('./initiateChat.js');
const userInfoCollection=require('./mongo/userInfoCollection.js');
const userCredentialsCollection=require('./mongo/userCredentialsCollection.js');
const userChatCollection=require('./mongo/userChatCollection.js');
const gibber=require('./scrambler/gibber.js');

const createSocketSession=function(req,server,callback){
  let users={};
  let rooms=[];
  const io = require('socket.io').listen(server);
  io.sockets.on('connection',function(socket){
    socket.on('status',function(data){
		let realCookie=socket.request.headers.cookie.split('=')[1].trim();
        let val=parseInt(gibber('dec',realCookie));
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
					let json={};
					json.status=data;
					json.userName=username;
					socket.emit('stateAndLoginUserName',json);
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
		let realCookie=socket.request.headers.cookie.split('=')[1].trim();
        let val=parseInt(gibber('dec',realCookie));
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

	socket.on('initiateSingleChatSession',function(data){
    console.log('initiateSingleChat',data);
	  let realCookie=socket.request.headers.cookie.split('=')[1].trim();
      let val=parseInt(gibber('dec',realCookie));
      updateDetails.cookieUserExist(val,function(output){
        if(!output.status){
          callback('login');
        }
        else{
          let dbInstance=output.dbInstance;
          let username=output.result;
          initiateChat.initiateSingleChat(val,data.userName,dbInstance,function(dataOutput){
            if(!dataOutput.status){
			  socket.emit('errorOccured',dataOutput.data);
            }
            else{
              if(dataOutput.data=='Success'){
				data.roomName=dataOutput.roomName;
				let resultSet={};
				resultSet.pastChat=dataOutput.pastChat;
				resultSet.receipientObj=data;
				resultSet.roomName=dataOutput.roomName;
        if(typeof socket.room !=='undefined'){
					if(socket.room!=data.roomName){
            socket.leave(socket.room);
            socket.room=data.roomName;
						socket.join(data.roomName);
					}
				}
				else{
					socket.room=data.roomName;
					socket.join(data.roomName);
				}
        //console.log('roomChatSingle',resultSet);
                socket.emit('roomChatRecordSingle',JSON.stringify(resultSet));
              }
              else{
                socket.emit('errorOccured','status updation failed');
              }
            }
          });

        }
      })
    })

    socket.on('sendChat',function(data){
		let realCookie=socket.request.headers.cookie.split('=')[1].trim();
        let val=parseInt(gibber('dec',realCookie));
        updateDetails.cookieUserExist(val,function(output){
          if(!output.status){
            callback('login');
          }
          else{
			let dbInstance=output.dbInstance;
			let username=output.result;
			userChatCollection.insertMsg(data.roomName,data.msg,dbInstance,function(dataOutput){
				if(!dataOutput.status){
					socket.emit('errorOccured',dataOutput.data);
				}
				else{
					if(typeof socket.room !=='undefined'){
						if(socket.room!=data.roomName){
              socket.leave(socket.room);
							socket.room=data.roomName;
							socket.join(data.roomName);
						}
					}
					else{
						socket.room=data.roomName;
						socket.join(data.roomName);
					}
						io.sockets.in(data.roomName).emit('sendingChat',data);
				}
			})
		  }
        })
      })
    socket.on('closeChat',function(data){
      if(typeof socket.room !=='undefined'){
        if(socket.room!=data.roomName){
          socket.leave(socket.room);
        }
      }
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
