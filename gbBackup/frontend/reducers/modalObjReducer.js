let initialState={};
initialState.flagType='';
initialState.show=false;
initialState.msg='';
const modalObjReducer=function(state=initialState,action){
  switch(action.type){
		case 'updateModalObj':
      return Object.assign({},action.val);
		default:
			return state;
	}
}
export default modalObjReducer;