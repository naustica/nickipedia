import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import videoReducer from './reducers/videoReducer';
import searchReducer from './reducers/searchReducer';


const reducers = combineReducers({
  video: videoReducer,
  search: searchReducer
})
const middleware = applyMiddleware(promise, thunk, logger)

const store = createStore(reducers, middleware)

export default store
