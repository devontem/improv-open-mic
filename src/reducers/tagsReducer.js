let message;

const tagsReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_TAGS':
			return state;
		case 'GET_TAGS_PENDING':
			return {...state, pending: true, success: false, error:false };
		case 'GET_TAGS_FULFILLED':
			return {...state, pending: false, ...action.payload.data, success: true };
		case 'GET_TAGS_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return { error: true, errorMessage: message, success: false };

		case 'GET_USED_TAGS':
			return state;
		case 'GET_USED_TAGS_PENDING':
			return {...state, pending: true, success: false, error:false};
		case 'GET_USED_TAGS_FULFILLED':
			return {...state, pending: false, usedTags: action.payload.data.data, success: true, error:false };
		case 'GET_USED_TAGS_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return { error: true, errorMessage: message, success: false };

		default:
			return state;
	}
};

export default tagsReducer;