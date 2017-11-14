const createDbInstance=require('./mongo/createDbInstance.js');
const userCredentialsCollection=require('./mongo/userCredentialsCollection.js');
const userChatCollection=require('./mongo/userChatCollection.js');
const updateDetails=require('./updateDetails.js');
const roomNameGenerator=require('./roomNameGenerator.js');

const initiateSingleChat=function(chatInitiator,chatNonInitiator,dbInstance,callback){
  updateDetails.userNameExist(chatNonInitiator,dbInstance,function(output){
		if(!output.status){
		  let jsonIntermediate={};
		  jsonIntermediate.status=false;
		  jsonIntermediate.data='Error in Creating chat session. Sorry for this inconvenience';
		  jsonIntermediate.errorCode=14;
		  callback(jsonIntermediate);
		  return;
        }
        else{
		  if(chatInitiator==output.result){
			console.log('same user');
			let jsonIntermediate={};
			jsonIntermediate.status=false;
			jsonIntermediate.data='You cant create Chat with yourself';
			jsonIntermediate.errorCode=15;
			callback(jsonIntermediate);
			return;
		  }
		  else{
			  let roomName=roomNameGenerator.singleChat(chatInitiator,output.result);
			  userChatCollection.collectionExistCheck(dbInstance,true,function(output){
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
				  userChatCollection.chatRoomExistCheck(roomName,dbInstance,true,function(output1){
					if(!output1.status){
					  if(output1.data.indexOf('err')==-1){
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
					  let json={};
					  json.status=output1.status;
					  json.data=output1.data;
					  json.dataType='string';
					  callback(json);
					  return;
					}
				  });
				}
			  });
			  
			  
			  
		  }
        }
  })
}

module.exports.initiateSingleChat=initiateSingleChat;
