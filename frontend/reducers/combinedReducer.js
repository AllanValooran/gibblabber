import { combineReducers } from 'redux';
import justReducer from './justReducer.js';
import searchKey from './searchKey.js';
import loginStatus from './loginStatus.js';

// Combine Reducers
var reduceComb = combineReducers({
  justReducer:justReducer,
  searchKey:searchKey,
  loginStatus:loginStatus
});

export default reduceComb;
