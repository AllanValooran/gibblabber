import { combineReducers } from 'redux';
import justReducer from './justReducer.js';
import searchKey from './searchKey.js';

// Combine Reducers
var reduceComb = combineReducers({
  justReducer:justReducer,
  searchKey:searchKey,
});

export default reduceComb;
