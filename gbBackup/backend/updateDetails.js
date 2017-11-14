const createDbInstance=require('./mongo/createDbInstance.js');
const userCredentialsCollection=require('./mongo/userCredentialsCollection.js');

const cookieUserExist=function(cookieVal,callback){
  createDbInstance(function(output){
    if(!output.status){
      let jsonIntermediate={};
      jsonIntermediate.status=false;
      jsonIntermediate.data='updateDetails cookieUserExist err';
      jsonIntermediate.errorCode=13;
      callback(jsonIntermediate);
      return;
    }
    else{
      userCredentialsCollection.checkCookieUserExist(cookieVal,output.data,function(data){
        if(!data.status){
          let jsonIntermediate={};
          jsonIntermediate.status=false;
          jsonIntermediate.data=data.data;
          jsonIntermediate.errorCode=data.errorCode;
          callback(jsonIntermediate);
          return;
        }
        else{
          if(data.data==='Success'){
            let jsonIntermediate={};
            jsonIntermediate.status=true;
            jsonIntermediate.data=data.data;
            jsonIntermediate.result=data.result;
            jsonIntermediate.dbInstance=output.data;
            callback(jsonIntermediate);
            return;
          }
          else{
            let jsonIntermediate={};
            jsonIntermediate.status=false;
            jsonIntermediate.data=data.data;
            callback(jsonIntermediate);
            return;
          }
        }
      })
    }

  });

}
const userNameExist=function(user,dbInstance,callback){
	userCredentialsCollection.checkUserNameExist(user,dbInstance,function(data){
        if(!data.status){
		  let jsonIntermediate={};
          jsonIntermediate.status=false;
          jsonIntermediate.data=data.data;
          jsonIntermediate.errorCode=data.errorCode;
          callback(jsonIntermediate);
          return;
        }
        else{
		  if(data.data==='Success'){
            let jsonIntermediate={};
            jsonIntermediate.status=true;
            jsonIntermediate.data=data.data;
            jsonIntermediate.result=data.result[0].uniqueId;
            callback(jsonIntermediate);
            return;
          }
          else{
            let jsonIntermediate={};
            jsonIntermediate.status=false;
            jsonIntermediate.data=data.data;
            callback(jsonIntermediate);
            return;
          }
        }
      })
}
module.exports.cookieUserExist=cookieUserExist;
module.exports.userNameExist=userNameExist;