

const forumReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_FORUM_POSTS':
			return state;
		case 'GET_FORUM_POSTS_PENDING':
			return state;
		case 'GET_FORUM_POSTS_FULFILLED':
			return state;
		case 'GET_FORUM_POSTS_REJECTED':
			return state;
		default:
			return state;
	}
};

export default forumReducer;