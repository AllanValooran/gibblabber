//Model
//{'uniqueId':'','userName':'','password':'','dummy':''}

const collectionExistCheck=require('./collectionExistCheck.js');
const collectionName='chatRecord';
const insertUserChatCollection=function(roomName,dbInstance,callback){
	console.log('insertUSERCOLLECTION');
	let userChatObj={};
	userChatObj.roomName=roomName;
	userChatObj.chat=[];
	userDateCreation=new Date();
	dbInstance.collection(collectionName).insertOne(userChatObj,function(err,res){
		if(err){
		  console.log('insertUSERCOLLECTION err');
		  let jsonIntermediate={};
		  jsonIntermediate.status=false;
		  jsonIntermediate.data='userchatCollection insertUserChatCollection err';
		  jsonIntermediate.errorCode=16;
		  callback(jsonIntermediate);
		  return;
		}
		else{
		  console.log('insertUSERCOLLECTION res');
		  let jsonIntermediate={};
		  jsonIntermediate.status=true;
		  jsonIntermediate.data='Success';
		  jsonIntermediate.result=[];
		  callback(jsonIntermediate);
		  return;
		}
	  });
}

const chatRoomExistCheck=function(roomName,dbInstance,flag,callback){
  let queryRoomName={};
  queryRoomName.roomName=roomName;
  dbInstance.collection(collectionName).find(queryRoomName).toArray(function(err,result) {
    if(err){
      let jsonIntermediate={};
      jsonIntermediate.status=false;
      jsonIntermediate.data='userCredentialsCollection checkUserNameExist err';
      jsonIntermediate.errorCode=15;
      callback(jsonIntermediate);
      return;
    }
    else{
      if(result.length==0){
        if(!flag){
				let jsonIntermediate={};
				jsonIntermediate.status=true;
				jsonIntermediate.data='Failure';
				callback(jsonIntermediate);
				return;
			}
			else{
				insertUserChatCollection(roomName,dbInstance,function(output){
					if(!output.status){
						let jsonIntermediate={};
						jsonIntermediate.status=true;
						jsonIntermediate.data='Failure';
						callback(jsonIntermediate);
						return;
					}
					else{
						let jsonIntermediate={};
						jsonIntermediate.status=true;
						jsonIntermediate.data='Success';
						jsonIntermediate.result=output.result;
						callback(jsonIntermediate);
						return;
					}
				});
			}

      }
      else{
        let jsonIntermediate={};
        jsonIntermediate.status=true;
        jsonIntermediate.data='Success';
        jsonIntermediate.result=result[0].chat;
        callback(jsonIntermediate);
        return;
      }
    }
  });
}

const insertMsg=function(roomName,msg,dbInstance,callback){
	console.log('NEW msg',msg);
	collectionExistCheckUserChat(dbInstance,true,function(output){
		if(!output.status){
		  if(output.data.indexOf('err')==-1){
		  dbInstance.close();
		  }
		  let json={};
		  json.status=false;
		  json.data='Service Error';
		  json.errorCode=output.errorCode;
		  json.dataType='string';
		  callback(json);
		  return;
		}
		else{
		  let queryRoomName={};
		  queryRoomName.roomName=roomName;
		  dbInstance.collection(collectionName).update(queryRoomName,{$push:{"chat":msg}},function(err,result){
			  if(err){
				  let json={};
				  json.status=false;
				  json.data='Service Error';
				  json.errorCode=16;
				  json.dataType='string';
				  callback(json);
				  return;
			  }
			  else{
				  let json={};
				  json.status=true;
				  json.data='Success';
				  json.dataType='string';
				  callback(json);
				  return;
			  }
		  })
		}
	})
}
const collectionExistCheckUserChat=function(dbInstance,flag,callback){
  collectionExistCheck(dbInstance,collectionName,flag,callback);
}


module.exports.collectionExistCheck=collectionExistCheckUserChat;
module.exports.chatRoomExistCheck=chatRoomExistCheck;
module.exports.insertMsg=insertMsg;
