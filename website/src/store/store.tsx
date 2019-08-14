import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import videoReducer from './reducers/videoReducer'


const reducers = combineReducers({
  video: videoReducer
})
const middleware = applyMiddleware(promise, thunk, logger)

const store = createStore(reducers, middleware)

export default store
