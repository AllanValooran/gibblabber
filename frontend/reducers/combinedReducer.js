import { combineReducers } from 'redux';
import justReducer from './justReducer.js';

// Combine Reducers
var reduceComb = combineReducers({
  justReducer:justReducer,
});

export default reduceComb;
