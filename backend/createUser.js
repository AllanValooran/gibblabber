const mongoConnection=require('./mongo/mongoConnector.js');
const collectionExistCheck=require('./mongo/collectionExistCheck.js');
const gibber=require('./scrambler/gibber.js');
const hash=require('./scrambler/hash.js');

const createUser=function(req,callback){
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
      let resultSet=Object.assign({},req.body);
      resultSet.password=hash('sha256',gibber('dec',resultSet.password));
      setUserInfo(resultSet,dbInstance,callback);
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
      dbInstance.close();
      let json={};
      json.status=true;
      json.data=output.data;
      json.dataType='string';
      callback(json);
      return;
    }
  });
}



module.exports=createUser;
