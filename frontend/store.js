import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/combinedReducer.js';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  reducers,
  applyMiddleware(thunk)
);
export default store;
