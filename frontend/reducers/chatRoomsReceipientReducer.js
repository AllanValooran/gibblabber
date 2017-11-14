let initialState=[];

const chatRoomsReceipientReducer=function(state=initialState,action){
  switch(action.type){
	  case 'update_chatRoomsReceipientReducer':
      if(state.length<4){
        action.val.highlight=true;
        let oldAlteredState=state.filter((obj,ind)=>{
          let val=obj;
          val.highlight=false;
          return val;
        })
        return oldAlteredState.concat(action.val);
  		}
  		else{
         action.val.highlight=true;
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
    default:
		return state;
	}
}
export default chatRoomsReceipientReducer;
