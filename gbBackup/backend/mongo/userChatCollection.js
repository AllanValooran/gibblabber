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
        jsonIntermediate.result=result;
        callback(jsonIntermediate);
        return;
      }
    }
  });
}
const collectionExistCheckUserCredentials=function(dbInstance,flag,callback){
  collectionExistCheck(dbInstance,collectionName,flag,callback);
}


module.exports.collectionExistCheck=collectionExistCheckUserCredentials;
module.exports.chatRoomExistCheck=chatRoomExistCheck;

