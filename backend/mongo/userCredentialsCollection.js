//Model
//{'uniqueId':'','userName':'','password':'','dummy':''}
const insertUserCredentialsCollection=function(resultSet,dbInstance,collectionName,callback){
  let uniqueIdVal=3000;
  dbInstance.collection(collectionName).find().count(function(err,res){
    if(err){
      let jsonIntermediate={};
      jsonIntermediate.status=false;
      jsonIntermediate.data='userCredentialsCollection insertUserCredentialsCollection err';
      jsonIntermediate.errorCode=9;
      callback(jsonIntermediate);
      return;
    }
    else{
      uniqueIdVal+=res+1;
      let userCredentialsObj={};
      userCredentialsObj.uniqueId=uniqueIdVal;
      userCredentialsObj.userName=resultSet.username;
      userCredentialsObj.password=resultSet.password;
      userCredentialsObj.dummy='';
      checkUserExist(userCredentialsObj.userName,userCredentialsObj.uniqueId,dbInstance,collectionName,function(output){
        if(!output.status){
          callback(output);
          return;
        }
        else{
          if(output.data==='userName already exists'){
            output.data='Duplicate';
            callback(output);
            return;
          }
          else{
              dbInstance.collection(collectionName).insertOne(userCredentialsObj,function(err,res){
                if(err){
                  let jsonIntermediate={};
                  jsonIntermediate.status=false;
                  jsonIntermediate.data='userCredentialsCollection err';
                  jsonIntermediate.errorCode=7;
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
      });
    }
  })

}

const checkUserExist=function(userName,uniqueId,dbInstance,collectionName,callback){
  let queryUserName={};
  queryUserName.userName=userName;
  let queryUniqueId={};
  queryUniqueId.uniqueId=uniqueId;
  dbInstance.collection(collectionName).find({ $or: [ queryUserName,queryUniqueId ] } ).toArray(function(err,result) {
    if(err){
      let jsonIntermediate={};
      jsonIntermediate.status=false;
      jsonIntermediate.data='userCredentialsCollection checkUserExist err';
      jsonIntermediate.errorCode=8;
      callback(jsonIntermediate);
    }
    else{
      console.log(result);
      if(result.length==0){
        let jsonIntermediate={};
        jsonIntermediate.status=true;
        jsonIntermediate.data='userName is new';
        callback(jsonIntermediate);
      }
      else{
        let jsonIntermediate={};
        jsonIntermediate.status=true;
        jsonIntermediate.data='userName already exists';
        callback(jsonIntermediate);
      }
    }
  });
}

module.exports.insertUserCredentialsCollection=insertUserCredentialsCollection;
