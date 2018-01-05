import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Account from "./../components/Account.jsx";
import swal from 'sweetalert';

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
				payload: axios.get('/api/users/'+id)
			});
		},
		updateProfile: function(id, form){
			dispatch({
				type: 'UPDATE_PROFILE',
				payload: axios.put('/api/users/' + id, form, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			})
			.then(()=>{
				swal("Success!", "Your credentials have been updated!", "success");
			})
			.catch(()=>{
				swal("There was an error!", "Your credentials were not updated, please try again later.", "error");
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