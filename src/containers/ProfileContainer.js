import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Profile from "./../components/Profile.jsx";
const queryString = require('query-string');

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
		const parsed = queryString.parse(this.props.location.search);
		const showAll = !parsed['followers'] && !parsed['following'] && !parsed['reviews'];
		return <Profile {...this.props} showAll={showAll} 
										followerView={parsed.followers === 'true'}
										followingView={parsed.following === 'true'}
										reviewsView={parsed.reviews === 'true'}
										/>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);