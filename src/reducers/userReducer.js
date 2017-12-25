let message;

const userReducer = (state = {}, action) => {
	switch (action.type) {

		case 'GET_FOLLOWING_POST':
			return state;
		case 'GET_FOLLOWING_PENDING':
			return {...state, pending: true};
		case 'GET_FOLLOWING_FULFILLED':
			return {...state, pending: false, following: action.payload.data.data};
		case 'GET_FOLLOWING_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return {...state, pending: false, error: true, errorMessage: message };


		case 'HANDLE_FOLLOW_ACTION':
			return state;
		case 'HANDLE_FOLLOW_ACTION_PENDING':
			return {...state, pending: true};
		case 'HANDLE_FOLLOW_ACTION_FULFILLED':
			return {...state, pending: false, followActionStatus: action.payload.data.data};
		case 'HANDLE_FOLLOW_ACTION_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return {...state, pending: false, error: true, errorMessage: message };


		default:
			return state;
	}
};

export default userReducer;