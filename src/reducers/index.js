import { combineReducers } from 'redux';
import forum from './forumReducer';
import openMics from './openMicReducer';
import review from './reviewReducer';

const reducers = combineReducers({
	forum,
	openMics,
	review
});

export default reducers;