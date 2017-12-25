import { combineReducers } from 'redux';
import forum from './forumReducer';
import openMics from './openMicReducer';
import review from './reviewReducer';
import profile from './profileReducer';
import auth from './authReducer';
import tags from './tagsReducer';

const reducers = combineReducers({
	forum,
	openMics,
	review,
	profile,
	auth,
	tags
});

export default reducers;