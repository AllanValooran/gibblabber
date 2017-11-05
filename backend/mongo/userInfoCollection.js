//Model
//{"userName":"Allan","emailId":"allanmvalooran@gmail.com","gender":"male","accountCreatedDate":"2017-11-05T16:59:59.512Z","userType":"user","passwordChangeDates":[],"dummy":""}
const insertUserInfoCollection=function(resultSet,dbInstance,collectionName,callback){
  let userInfoObj={};
  userInfoObj.userName=resultSet.username;
  userInfoObj.emailId=resultSet.email;
  userInfoObj.gender=resultSet.gender;
  userInfoObj.accountCreatedDate=new Date();
  userInfoObj.userType='user';
  userInfoObj.passwordChangeDates=[];
  userInfoObj.dummy='';
  checkUserExist(userInfoObj.userName,userInfoObj.emailId,dbInstance,collectionName,function(output){
    if(!output.status){
      callback(output);
    }
    else{
      if(output.data==='userName already exists'){
        output.data='Duplicate';
        callback(output);
      }
      else{
          dbInstance.collection(collectionName).insertOne(userInfoObj,function(err,res){
            if(err){
              let jsonIntermediate={};
              jsonIntermediate.status=false;
              jsonIntermediate.data='userInfoCollection err';
              jsonIntermediate.errorCode=6;
              callback(jsonIntermediate);
            }
            else{
              let jsonIntermediate={};
              jsonIntermediate.status=true;
              jsonIntermediate.data='Success';
              callback(jsonIntermediate);
            }
          });
      }
    }
  });
}

const checkUserExist=function(userName,email,dbInstance,collectionName,callback){
  let queryUserName={};
  queryUserName.userName=userName;
  let queryUserEmail={};
  queryUserEmail.emailId=email;
  dbInstance.collection(collectionName).find({ $or: [ queryUserName,queryUserEmail ] } ).toArray(function(err,result) {
    if(err){
      let jsonIntermediate={};
      jsonIntermediate.status=false;
      jsonIntermediate.data='userInfoCollection checkUserExist err';
      jsonIntermediate.errorCode=5;
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

module.exports.insertUserInfoCollection=insertUserInfoCollection;
