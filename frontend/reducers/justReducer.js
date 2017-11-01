let initialState=''
const justReducer=function(state=initialState,action){
  switch(action.type){
		case 'just':
      return 'JUST HELLO';
		default:
			return state;
	}
}
export default justReducer;
