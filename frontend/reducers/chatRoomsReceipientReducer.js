let initialState=[];

const chatRoomsReceipientReducer=function(state=initialState,action){
  switch(action.type){
	  case 'update_chatRoomsReceipientReducer':
      console.log('reducer update_chatRoomsReceipientReducer');
      if(state.length<4){
        action.val.highlight=true;
		    action.val.msgToSend='';
        action.val.typingMsg='';
		  let oldAlteredState=state.filter((obj,ind)=>{
          let val=obj;
          val.highlight=false;
		      val.msgToSend='';
		  return val;
        })
        return oldAlteredState.concat(action.val);
  		}
  		else{
         action.val.highlight=true;
	       action.val.msgToSend='';
         action.val.typingMsg='';
         let popedState=state.filter((item,i) => {
  				return i<3
  		 });
        return popedState.concat(action.val);
   	   }
    case 'highlight_Chat':
      let oldAlteredState=state.filter((obj,ind)=>{
        if(ind==action.val){
          let val=obj;
          val.highlight=true;
          return val;
        }
        else{
          let val=obj;
          val.highlight=false;
          return val;
        }
      })
      return oldAlteredState;
    case 'pop_chat_by_ind':
      let popedState=state.filter((item,i) => {
        if(i!=action.val){
           item.highlight=false;
           return item;
        }
      });
      console.log('pop_chat_ind',popedState);
      if(popedState.length!=0){
        popedState[popedState.length-1].highlight=true;
      }
      return popedState;
	 case 'change_msgToSend':
		return state.filter((item,i)=>{
					if(action.val.index==i){
						item.msgToSend=action.val.msgToSend;
					}
					return item;
				});
	case 'update_MsgReceipientReducer':
		 return state.filter((item,i)=>{
			if(action.val.roomName==item.roomName){
				item.msg.push(action.val.msg);
				item.msgToSend='';
			}
			return item
		});
  case 'updateMsgOnly':
    console.log('reducer updateMsgOnly');
    return state.filter((item,i)=>{
      if(action.val.ind==i){
        item.msg=action.val.msg;
        item.highlight=true;
      }
      else{
        item.highlight=false;
      }
      return item;
    })
   case 'updateReceiverAction':
   return state.filter((item,i)=>{
     if(action.val.ind==i && item.highlight){
       item.typingMsg=action.val.msg;
    }
     else{
       item.typingMsg='';
     }
     return item;
   })
    default:
		return state;
	}
}
export default chatRoomsReceipientReducer;
