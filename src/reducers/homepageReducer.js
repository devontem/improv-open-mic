let message;

const homepageReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_HOME_PAGE':
			return state;
		case 'GET_HOME_PAGE_PENDING':
			return {...state, pending: true};
		case 'GET_HOME_PAGE_FULFILLED':
			return {...state, pending: false, ...action.payload.data };
		case 'GET_HOME_PAGE_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return { error: true, errorMessage: message };

		default:
			return state;
	}
};

export default homepageReducer;