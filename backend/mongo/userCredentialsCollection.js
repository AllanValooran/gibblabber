//Model
//{'uniqueId':'','userName':'','password':'','dummy':''}
const gibber=require('../scrambler/gibber.js');
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
      return;
    }
    else{
      if(result.length==0){
        let jsonIntermediate={};
        jsonIntermediate.status=true;
        jsonIntermediate.data='userName is new';
        callback(jsonIntermediate);
        return;
      }
      else{
        let jsonIntermediate={};
        jsonIntermediate.status=true;
        jsonIntermediate.data='userName already exists';
        callback(jsonIntermediate);
        return;
      }
    }
  });
}

const checkMatchUserCredentials=function(req,res,resultSet,dbInstance,collectionName,callback){
  let query={};
  query.userName=resultSet.username;
  dbInstance.collection(collectionName).find(query).toArray(function(err,result) {
    if(err){
      let jsonIntermediate={};
      jsonIntermediate.status=false;
      jsonIntermediate.data='userCredentialsCollection checkMatchUserCredentials err';
      jsonIntermediate.errorCode=10;
      callback(jsonIntermediate);
      return;
    }
    else{
      if(result.length==0){
        let jsonIntermediate={};
        jsonIntermediate.status=true;
        jsonIntermediate.data='No such username exists';
        callback(jsonIntermediate);
        return;
      }
      else{
        if(resultSet.password===result[0].password){
          let cookie = req.cookies.token;
          let gibbToken=gibber('enc',''+result[0].uniqueId);
          res.cookie('token',gibbToken, { maxAge: 900000, httpOnly: true });
          let jsonIntermediate={};
          jsonIntermediate.status=true;
          jsonIntermediate.data='Password Match';
          callback(jsonIntermediate);
          return;
        }
        else{
          let jsonIntermediate={};
          jsonIntermediate.status=true;
          jsonIntermediate.data='Password Mismatch';
          callback(jsonIntermediate);
          return;
        }

      }
    }
  });
}

module.exports.insertUserCredentialsCollection=insertUserCredentialsCollection;
module.exports.checkMatchUserCredentials=checkMatchUserCredentials;
