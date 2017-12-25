import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import LoginSignup from "./../components/LoginSignup.jsx";
const queryString = require('query-string');

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		dispatchLogin: function(form){
			dispatch({
				type: 'LOGIN',
				payload: axios.post('http://localhost:8080/api/auth/login', form)
			});
		},
		dispatchSignUp: function(form){
			dispatch({
				type: 'SIGN_UP',
				payload: axios.post('http://localhost:8080/api/auth/signup', form)
			})
			// // getting new comments after submit
			// .then(() => {
			// 	dispatch({
			// 		type: 'GET_THREAD_POST',
			// 		payload: axios.get('http://localhost:8080/api/forum/' + form.parent_post_id)
			// 	});
			// });
		}
	}
};

class LoginSignupContainer extends Component {
	render(){
		const parsed = queryString.parse(this.props.location.search);
		return <LoginSignup {...this.props} signUp={parsed.signup === 'true'} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupContainer);