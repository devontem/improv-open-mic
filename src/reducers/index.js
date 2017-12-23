import { combineReducers } from 'redux';
import forum from './forumReducer';
import openMics from './openMicReducer';
import review from './reviewReducer';
import profile from './profileReducer';

const reducers = combineReducers({
	forum,
	openMics,
	review,
	profile
});

export default reducers;