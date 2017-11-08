const mongoConnection=require('./mongoConnector.js');

const createDbInstance=function(callback){
  const db_ipAddress="localhost";
  const port_no=27017;
  const db_name='test'
  const dbConnectionUrl='mongodb://'+db_ipAddress+':'+port_no+'/'+db_name;
  mongoConnection.createConnection(dbConnectionUrl,function(err,dbInstance){
  	if(err){
      let json={};
      json.status=false;
      json.data='Service Error';
      json.errorCode=12;
      json.dataType='string';
      callback(json);
      return;
  	}
  	else{
      let json={};
      json.status=true;
      json.data=dbInstance;
      json.dataType='db';
      callback(json);
      return;
    }
  });
}

module.exports=createDbInstance;
