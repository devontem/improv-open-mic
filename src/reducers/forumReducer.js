let message;

const forumReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_FORUM_POSTS':
			return state;
		case 'GET_FORUM_POSTS_PENDING':
			return {...state, pending: true};
		case 'GET_FORUM_POSTS_FULFILLED':
			return {...state, pending: false, posts: action.payload.data.data };
		case 'GET_FORUM_POSTS_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return { error: true, errorMessage: message };


		case 'CREATE_FORUM_POST':
			return state;
		case 'CREATE_FORUM_POST_PENDING':
			return {...state, pending: true};
		case 'CREATE_FORUM_POST_FULFILLED':
			return {...state, pending: false, createPost: action.payload.data.data };
		case 'CREATE_FORUM_POST_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return {...state, pending: false, error: true, errorMessage: message };


		case 'GET_THREAD_POST':
			return state;
		case 'GET_THREAD_POST_PENDING':
			return {...state, pending: true};
		case 'GET_THREAD_POST_FULFILLED':
			return {...state, pending: false, thread: action.payload.data.data };
		case 'GET_THREAD_POST_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return {...state, pending: false, error: true, errorMessage: message };


		case 'SUBMIT_THREAD_COMMENT':
			return state;
		case 'SUBMIT_THREAD_COMMENT_PENDING':
			return {...state, pending: true};
		case 'SUBMIT_THREAD_COMMENT_FULFILLED':
			return {...state, pending: false, submitComment: action.payload.data.data };
		case 'SUBMIT_THREAD_COMMENT_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return {...state, pending: false, error: true, errorMessage: message };


		default:
			return state;
	}
};

export default forumReducer;