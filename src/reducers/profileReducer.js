let message;

const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GGET_PROFILE':
			return state;
		case 'GET_PROFILE_PENDING':
			return {...state, pending: true};
		case 'GET_PROFILE_FULFILLED':
			return {...state, pending: false, ...action.payload.data };
		case 'GET_PROFILE_REJECTED':
			message = (action.payload.message) ? action.payload.message : 'An error has occured. Please try again later.';
			return { error: true, errorMessage: message };


		default:
			return state;
	}
};

export default profileReducer;