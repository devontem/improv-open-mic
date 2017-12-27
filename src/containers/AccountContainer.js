import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Account from "./../components/Account.jsx";

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getProfile: function(id){
			dispatch({
				type: 'GET_PROFILE',
				payload: axios.get('http://localhost:8080/api/users/'+id)
			});
		},
		updateProfile: function(id, form){
			dispatch({
				type: 'UPDATE_PROFILE',
				payload: axios.put('http://localhost:8080/api/users/' + id, form, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			});
		}
	}
};

class AccountContainer extends Component {
	componentWillMount(){
		var id = localStorage.getItem('imp-uid');
		this.props.getProfile(id);
	}
	render(){
		return <Account {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);