let initialState={};
initialState.flagType='';
initialState.show=false;
initialState.msg='';
initialState.msgTitle='';
const modalObjReducer=function(state=initialState,action){
  switch(action.type){
		case 'updateModalObj':
      return Object.assign({},action.val);
		default:
			return state;
	}
}
export default modalObjReducer;
