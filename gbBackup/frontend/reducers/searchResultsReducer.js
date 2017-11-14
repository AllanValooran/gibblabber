let initialState=[];
const searchResultsReducer=function(state=initialState,action){
  switch(action.type){
		case 'updateSearchResults':
      return action.val;
		default:
			return state;
	}
}
export default searchResultsReducer;
