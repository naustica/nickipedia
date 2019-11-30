import { createStore, combineReducers, applyMiddleware, Reducer, Store } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import videoReducer from './reducers/videoReducer'
import searchReducer from './reducers/searchReducer'
import authenticationReducer from './reducers/authenticationReducer'


const reducers: Reducer = combineReducers({
  video: videoReducer,
  search: searchReducer,
  authentication: authenticationReducer
})
const middleware = applyMiddleware(promise, thunk, logger)

const store: Store = createStore(reducers, middleware)

export default store
