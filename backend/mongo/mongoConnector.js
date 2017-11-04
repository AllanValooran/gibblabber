const mongoClient=require('mongodb').MongoClient;


const createConnection=function(dbConnectionUrl,callback){
	console.log('**Connection Establishment Begins**');
	mongoClient.connect(dbConnectionUrl,function(err,dbInstance){
		if(err){
			callback(err,dbInstance);
		}
		else{
			callback(err,dbInstance);
		}
	});
}
module.exports.createConnection=createConnection;
