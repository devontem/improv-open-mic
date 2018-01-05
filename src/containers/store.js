import reducers from './../reducers/index';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
let middleware;

// setting up middleware
if (process.env.PROD){
	middleware = applyMiddleware(promise(), thunk)
} else {
	middleware = applyMiddleware(promise(), thunk, logger)
}

// creating store
const store = createStore(reducers, middleware);

export default store;