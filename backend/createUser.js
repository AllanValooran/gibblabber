const mongoConnection=require('./mongo/mongoConnector.js');
const collectionExistCheck=require('./mongo/collectionExistCheck.js');
const userInfoCollection=require('./mongo/userInfoCollection.js');
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
  const db_ipAddress="localhost";
  const port_no=27017;
  const db_name='test'
  const dbConnectionUrl='mongodb://'+db_ipAddress+':'+port_no+'/'+db_name;
  mongoConnection.createConnection(dbConnectionUrl,function(err,dbInstance){
  	if(err){
      let json={};
      json.status=false;
      json.data='Service Error';
      json.errorCode=0;
      json.dataType='string';
      callback(json);
      return;
  	}
  	else{
      resultSet.password=hash('sha256',gibber('dec',req.body.password));
      resultSet.functionIdentifier=gibber('dec',req.body.functionIdentifier);
      setUserInfo(resultSet,dbInstance,function(output){
        if(!output.status){
          callback(output);
        }
        else{
          //setUserCredentials
          callback(output);
        }
      });
  	}
  });
}

const setUserInfo=function(resultSet,dbInstance,callback){
    let collectionName='macin'
    collectionExistCheck(dbInstance ,collectionName,true,function(output){
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
      userInfoCollection.insertUserInfoCollection(resultSet,dbInstance,collectionName,function(output1){
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



module.exports=createUser;
