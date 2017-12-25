let message;

const authReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SIGN_UP':
			return state;
		case 'SIGN_UP_PENDING':
			return {...state, pending: true, success: false};
		case 'SIGN_UP_FULFILLED':
			return {...state, pending: false, ...action.payload.data, success: true };
		case 'SIGN_UP_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return { error: true, errorMessage: message, success: false };


		case 'LOGIN':
			return state;
		case 'LOGIN_PENDING':
			return {...state, pending: true, success: false};
		case 'LOGIN_FULFILLED':
			return {...state, pending: false, ...action.payload.data, success: true };
		case 'LOGIN_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return { error: true, errorMessage: message, success: false };

		default:
			return state;
	}
};

export default authReducer;