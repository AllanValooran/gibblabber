let initialState={}
initialState['status']='';
initialState['userName']='';
const loginDetails=function(state=initialState,action){
  switch(action.type){
		case 'updateLoginStatusUserName':
			return action.val
		case 'updateLoginStatus':
			return action.val;
		default:
			return state;
	}
}
export default loginDetails;
