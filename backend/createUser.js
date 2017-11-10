const mongoConnection=require('./mongo/mongoConnector.js');
const collectionExistCheck=require('./mongo/collectionExistCheck.js');
const userInfoCollection=require('./mongo/userInfoCollection.js');
const userCredentialsCollection=require('./mongo/userCredentialsCollection.js');
const createDbInstance=require('./mongo/createDbInstance.js');
const gibber=require('./scrambler/gibber.js');
const hash=require('./scrambler/hash.js');


const createUser=function(req,callback){
  let resultSet=Object.assign({},req.body);
  if(resultSet.username==='' || resultSet.email==='' || resultSet.gender==='' || resultSet.password==='' || resultSet.functionIdentifier===''){
    let json={};
    json.status=false;
    json.data='Error in Request';
    json.errorCode=-1;
    json.dataType='string';
    callback(json);
    return;
  }
  createDbInstance(function(output1){
    if(!output1.status){
      let jsonIntermediate={};
      jsonIntermediate.status=false;
      jsonIntermediate.data='createUser createDbInstance err';
      jsonIntermediate.errorCode=13;
      callback(jsonIntermediate);
      return;
    }
    else{
      let dbInstance=output1.data;
      resultSet.password=hash('sha256',gibber('dec',req.body.password));
      resultSet.functionIdentifier=gibber('dec',req.body.functionIdentifier);
      setUserInfo(resultSet,dbInstance,function(output){
        if(!output.status){
          callback(output);
          return;
        }
        else{
          if(output.data==='Duplicate'){
            dbInstance.close();
            callback(output);
            return;
          }
          else{
              setUserCredentials(resultSet,dbInstance,function(output1){
                callback(output1);
            })
          }
        }
      });
  	}
  });
}

const setUserInfo=function(resultSet,dbInstance,callback){
    userInfoCollection.collectionExistCheck(dbInstance ,true,function(output){
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
      userInfoCollection.insertUserInfoCollection(resultSet,dbInstance,function(output1){
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

const setUserCredentials=function(resultSet,dbInstance,callback){
    userCredentialsCollection.collectionExistCheck(dbInstance,true,function(output){
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
      userCredentialsCollection.insertUserCredentialsCollection(resultSet,dbInstance,function(output1){
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
          dbInstance.close();
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

module.exports=createUser;
