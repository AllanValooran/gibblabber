let initialState=[];
const searchResultsReducer=function(state=initialState,action){
  console.log('Red state',state);
  console.log('Red action',action);
  switch(action.type){
		case 'updateSearchResults':
      return action.val;
		default:
			return state;
	}
}
export default searchResultsReducer;
