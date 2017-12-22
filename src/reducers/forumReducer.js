let message;

const forumReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_FORUM_POSTS':
			return state;
		case 'GET_FORUM_POSTS_PENDING':
			return {pending: true};
		case 'GET_FORUM_POSTS_FULFILLED':
			return { data: action.payload.data.data };
		case 'GET_FORUM_POSTS_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return { error: true, errorMessage: message };
		default:
			return state;
	}
};

export default forumReducer;