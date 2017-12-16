const typing=function(data,callback){
  let json={};
  let typingMsgTemplate='';
  if(data.msg!==''){
    typingMsgTemplate+=data.userName;
    for(let i=0;i<typeKeyMatching.length;i++){
      if(data.msg.toLowerCase().includes(typeKeyMatching[i].key)){
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
{'key':'love','typingKey':'is going to express his affection'},
{'key':'apologize','typingKey':'is trying his best to apologize'},
{'key':'hate','typingKey':'is going to express his hatred'},
{'key':'meet','typingKey':'is going to propose a meetup'}
]

module.exports.typing=typing;
