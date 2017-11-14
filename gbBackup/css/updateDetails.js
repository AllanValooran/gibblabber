const createDbInstance=require('./mongo/createDbInstance.js');
const userCredentialsCollection=require('./mongo/userCredentialsCollection.js');

const cookieUserExist=function(cookieVal){
  createDbInstance(function(output){
    if(!output.status){

    }
    else{
      
    }
    userCredentialsCollection.checkCookieUserExist(cookieVal,dbInstance,function(db))
  });

}
module.exports.cookieUserExist=cookieUserExist;
