let initialState={}
const socketReducer=function(state=initialState,action){
  switch(action.type){
		case 'updateSocketVal':
      return action.val;
		default:
			return state;
	}
}
export default socketReducer;
