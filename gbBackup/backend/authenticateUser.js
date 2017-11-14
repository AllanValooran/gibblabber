const mongoConnection=require('./mongo/mongoConnector.js');
const collectionExistCheck=require('./mongo/collectionExistCheck.js');
const userInfoCollection=require('./mongo/userInfoCollection.js');
const userCredentialsCollection=require('./mongo/userCredentialsCollection.js');
const createDbInstance=require('./mongo/createDbInstance.js');
const gibber=require('./scrambler/gibber.js');
const hash=require('./scrambler/hash.js');


const authenticateUser=function(req,res,callback){
  let resultSet=Object.assign({},req.body);

  if(resultSet.username==='' || resultSet.password===''){
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
      jsonIntermediate.data='authenticateUser createDbInstance err';
      jsonIntermediate.errorCode=13;
      callback(jsonIntermediate);
      return;
    }
    else{
      let dbInstance=output1.data;
      resultSet.password=hash('sha256',gibber('dec',req.body.password));
      resultSet.functionIdentifier=gibber('dec',req.body.functionIdentifier);
      checkUserCredentials(req,res,resultSet,dbInstance,function(output){
        if(!output.status){
          callback(output);
          return;
        }
        else{
          //setUserCredentials
          callback(output);
          return;
        }
      });
  	}
  });
}

const checkUserCredentials=function(req,res,resultSet,dbInstance,callback){
    userInfoCollection.collectionExistCheck(dbInstance,false,function(output){
      if(!output.status){
        if(output.data.indexOf('err')==-1){
        dbInstance.close();
        }
        if(output.errorCode===2){
          let json={};
          json.status=false;
          json.data='Not a member. Please signup';
          json.errorCode=output.errorCode;
          json.dataType='string';
          callback(json);
          return;
        }
        else{
          let json={};
          json.status=false;
          json.data='Service Error';
          json.errorCode=output.errorCode;
          json.dataType='string';
          callback(json);
          return;
        }

      }
      else{
        userCredentialsCollection.checkMatchUserCredentials(req,res,resultSet,dbInstance,function(output1){
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
module.exports=authenticateUser;
