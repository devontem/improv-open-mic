let message;

const reviewReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_REVIEW_POST':
			return state;
		case 'GET_REVIEW_PENDING':
			return {...state, pending: true};
		case 'GET_REVIEW_FULFILLED':
			return {...state, pending: false, ...action.payload.data.data};
		case 'GET_REVIEW_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return {...state, pending: false, error: true, errorMessage: message };

		case 'CREATE_REVIEW_POST':
			return state;
		case 'CREATE_REVIEW_PENDING':
			return {...state, pending: true, success: false};
		case 'CREATE_REVIEW_FULFILLED':
			return {...state, pending: false, data: action.payload.data.data, success: true};
		case 'CREATE_REVIEW_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return {...state, pending: false, error: true, errorMessage: message, success: false };


		default:
			return state;
	}
};

export default reviewReducer;