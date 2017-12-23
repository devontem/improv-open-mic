import { combineReducers } from 'redux';
import forum from './forumReducer';
import openMics from './openMicReducer';

const reducers = combineReducers({
	forum,
	openMics
});

export default reducers;