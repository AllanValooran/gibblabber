let initialState=''
const searchKey=function(state=initialState,action){
  switch(action.type){
		case 'update':
      return action.val;
		default:
			return state;
	}
}
export default searchKey;
