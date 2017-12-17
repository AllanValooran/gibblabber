const typing=function(data,callback){
  let json={};
  let typingMsgTemplate='';
  if(data.msg!==''){
    typingMsgTemplate+=data.userName;
    for(let i=0;i<typeKeyMatching.length;i++){
      //if(data.msg.toLowerCase().includes(typeKeyMatching[i].key)){
      if(data.msg.match(new RegExp(typeKeyMatching[i].key,'gi'))){
         typingMsgTemplate+=typeKeyMatching[i].typingKey;
         break;
      }
    }
    if(typingMsgTemplate===data.userName){
       typingMsgTemplate+=' is typing...';
    }

  }
  json.typingMsg=typingMsgTemplate;
  json.roomName=data.roomName;
  callback(json);
}

let typeKeyMatching=[
{'key':'love|like|pyar|kadal','typingKey':'is going to express his affection'},
{'key':'sorry|apologize','typingKey':'is trying his best to apologize'},
{'key':'hate','typingKey':'is going to express his hatred'},
{'key':'meet|coffee|data|dinner|lunch','typingKey':'is going to propose a meetup'}
]

module.exports.typing=typing;
