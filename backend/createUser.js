const mongoConnection=require('./mongo/mongoConnector.js');
const gibber=require('./scrambler/gibber.js');
const hash=require('./scrambler/hash.js');

const createUser=function(req,callback){
  const db_ipAddress="localhost";
  const port_no=27017;
  const db_name='test'
  const dbConnectionUrl='mongodb://'+db_ipAddress+':'+port_no+'/'+db_name;
  mongoConnection.createConnection(dbConnectionUrl,function(err,dbInstance){
  	if(err){
      db.close();
      let json={};
      json.status=false;
      json.data='Server Down';
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
  let collectionName='hell0o'
  dbInstance.listCollections().toArray(function(err, collInfos) {
      // collInfos is an array of collection info objects that look like:
      // { name: 'test', options: {} }
      console.log(collInfos);
  });
  /*
  .find(,function(err,collection){

		collection.toArray(function(err,results){

			if(results==undefined || results.length==0)
			{
				db.close();
				if(workFlow.length==0)
				{
					json.status=false;
				}
				else
				{
					json.status=true;
				}
				json.workflow=workFlow;
				callback(json);

			}
			else
			{
				workFlow.push(results[0]["EMP_NAME"]);
				emp_id=results[0]["MGR_ID"];
				getWorkFlow(db,collectionName,emp_id,callback,workFlow);
			}
		});
    */
}



module.exports=createUser;
