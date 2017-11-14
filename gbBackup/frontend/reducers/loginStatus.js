let initialState=''
const loginStatus=function(state=initialState,action){
  switch(action.type){
		case 'updateLoginStatus':
      return action.val;
		default:
			return state;
	}
}
export default loginStatus;
