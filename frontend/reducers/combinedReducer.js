import { combineReducers } from 'redux';
import searchResultsReducer from './searchResultsReducer.js';
import searchKey from './searchKey.js';
import loginStatus from './loginStatus.js';

// Combine Reducers
var reduceComb = combineReducers({
  searchResults:searchResultsReducer,
  searchKey:searchKey,
  loginStatus:loginStatus
});

export default reduceComb;
