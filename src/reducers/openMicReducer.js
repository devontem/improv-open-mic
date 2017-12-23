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


		case 'CREATE_JAM_MICS':
			return state;
		case 'CREATE_JAM_PENDING':
			return {...state, pending: true, success: false};
		case 'CREATE_JAM_FULFILLED':
			return {...state, pending: false, items: action.payload.data.data, success: true };
		case 'CREATE_JAM_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return { error: true, errorMessage: message, success: false };


		case 'GET_JAM':
			return state;
		case 'GET_JAM_PENDING':
			return {...state, pending: true};
		case 'GET_JAM_FULFILLED':
			return {...state, pending: false, ...action.payload.data};
		case 'GET_JAM_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return { error: true, errorMessage: message, success: false };

		default:
			return state;
	}
};

export default openMicReducer;