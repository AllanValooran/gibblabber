import { combineReducers } from 'redux';
import searchResultsReducer from './searchResultsReducer.js';
import searchKey from './searchKey.js';
import loginDetailsReducer from './loginDetailsReducer.js';
import modalObjReducer from './modalObjReducer.js';
import socketReducer from './socketReducer.js';
import chatRoomsReceipientReducer from './chatRoomsReceipientReducer.js';

// Combine Reducers
var reduceComb = combineReducers({
  searchResults:searchResultsReducer,
  searchKey:searchKey,
  loginDetails:loginDetailsReducer,
  modalObj:modalObjReducer,
  chatRoomsReceipient:chatRoomsReceipientReducer,
  
});

export default reduceComb;
