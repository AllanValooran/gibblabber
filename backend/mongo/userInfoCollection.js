//Model
//{"userName":"Allan","emailId":"allanmvalooran@gmail.com","gender":"male","accountCreatedDate":"2017-11-05T16:59:59.512Z","userType":"user","passwordChangeDates":[],"dummy":""}
const collectionExistCheck=require('./collectionExistCheck.js');

const collectionName='macin';
const insertUserInfoCollection=function(resultSet,dbInstance,callback){
  let userInfoObj={};
  userInfoObj.userName=resultSet.username;
  userInfoObj.firstName=resultSet.firstname;
  userInfoObj.lastName=resultSet.lastname;
  userInfoObj.emailId=resultSet.email;
  userInfoObj.gender=resultSet.gender;
  userInfoObj.country=resultSet.country;
  userInfoObj.mobileno=resultSet.mobileno;
  userInfoObj.accountCreatedDate=new Date();
  userInfoObj.userType='user';
  userInfoObj.passwordChangeDates=[];
  userInfoObj.status='offline';
  userInfoObj.dummy='';
  checkUserExist(userInfoObj.userName,userInfoObj.emailId,dbInstance,function(output){
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
          dbInstance.collection(collectionName).insertOne(userInfoObj,function(err,res){
            if(err){
              let jsonIntermediate={};
              jsonIntermediate.status=false;
              jsonIntermediate.data='userInfoCollection err';
              jsonIntermediate.errorCode=6;
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

const checkUserExist=function(userName,email,dbInstance,callback){
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
const updateStatus=function(userName,status,dbInstance,callback){
    let queryUserName={};
    queryUserName.userName=userName;
    let setStatus={$set:{status:status}};
    dbInstance.collection(collectionName).update(queryUserName,setStatus,function(err,result){
      if(err){
        let jsonIntermediate={};
        jsonIntermediate.status=false;
        jsonIntermediate.data='userInfoCollection updateStatus err';
        jsonIntermediate.errorCode=5;
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
const searchUsers=function(searchKeyWord,dbInstance,callback){
  let regExpression='/^'+searchKeyWord+'/i';
  let queryUserName={};
  queryUserName.userName={$regex:eval(regExpression)};
  dbInstance.collection(collectionName).find(queryUserName,{'_id':false,'userName':true,'emailId':true,'firstName':true,'lastName':true},{limit:100}).toArray(function(err,result){
    if(err){
      let jsonIntermediate={};
      jsonIntermediate.status=false;
      jsonIntermediate.data='userInfoCollection searchUsers err';
      jsonIntermediate.errorCode=13;
      callback(jsonIntermediate);
    }
    else{
        let jsonIntermediate={};
        jsonIntermediate.status=true;
        jsonIntermediate.data='Success';
        jsonIntermediate.result=result;
        callback(jsonIntermediate);
    }
  });
}

const collectionExistCheckUserInfo=function(dbInstance,flag,callback){
  collectionExistCheck(dbInstance,collectionName,flag,callback);
}

module.exports.insertUserInfoCollection=insertUserInfoCollection;
module.exports.collectionExistCheck=collectionExistCheckUserInfo;
module.exports.updateStatus=updateStatus;
module.exports.searchUsers=searchUsers;
