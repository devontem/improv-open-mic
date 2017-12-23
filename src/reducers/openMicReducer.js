let message;

const openMicReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_OPEN_MICS':
			return state;
		case 'GET_OPEN_MICS_PENDING':
			return {...state, pending: true};
		case 'GET_OPEN_MICS_FULFILLED':
			return {...state, pending: false, items: action.payload.data.data };
		case 'GET_OPEN_MICS_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return { error: true, errorMessage: message };

		default:
			return state;
	}
};

export default openMicReducer;