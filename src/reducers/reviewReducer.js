let message;

const reviewReducer = (state = {}, action) => {
	switch (action.type) {
		// case 'GET_FORUM_POSTS':
		// 	return state;
		// case 'GET_FORUM_POSTS_PENDING':
		// 	return {...state, pending: true};
		// case 'GET_FORUM_POSTS_FULFILLED':
		// 	return {...state, pending: false, posts: action.payload.data.data };
		// case 'GET_FORUM_POSTS_REJECTED':
		// 	message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
		// 	return { error: true, errorMessage: message };


		case 'GET_REVIEW_POST':
			return state;
		case 'GET_REVIEW_PENDING':
			return {...state, pending: true};
		case 'GET_REVIEW_FULFILLED':
			return {...state, pending: false, ...action.payload.data.data};
		case 'GET_REVIEW_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return {...state, pending: false, error: true, errorMessage: message };


		default:
			return state;
	}
};

export default reviewReducer;