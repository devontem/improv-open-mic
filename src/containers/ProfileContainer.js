import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Profile from "./../components/Profile.jsx";

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
		}
	}
};

class ProfileContainer extends Component {
	componentWillMount(){
		var id = this.props.match.params.id;
		console.log(id)
		this.props.getProfile(id);
	}

	render(){
		return <Profile {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);