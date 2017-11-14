const crypto = require('crypto');

const hash=function(type,val){
  return crypto.createHash(type).update(val).digest('base64');
}


module.exports=hash;
