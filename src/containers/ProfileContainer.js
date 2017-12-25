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
		},
		getFollowing: function(id){
			dispatch({
				type: 'GET_FOLLOWING',
				payload: axios.get(`http://localhost:8080/api/users/${id}/following`, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			});
		},
		follow: function(form){
			dispatch({
				type: 'HANDLE_FOLLOW_ACTION',
				payload: axios.post(`http://localhost:8080/api/users/follow/`, form, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			})
			.then(() => {
				this.getProfile(form.followee);
				this.getFollowing(form.follower);
			});
		},
		unfollow: function(form){
			dispatch({
				type: 'HANDLE_FOLLOW_ACTION',
				payload: axios.post(`http://localhost:8080/api/users/unfollow/`, form, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			})
			.then(() => {
				this.getProfile(form.followee);
				this.getFollowing(form.follower);
			});
		}
	}
};

class ProfileContainer extends Component {
	componentWillMount(){
		var id = this.props.match.params.id,
		loggedInUserId = localStorage.getItem('imp-uid');
		this.props.getProfile(id);

		// get logged in user following list
		if (this.loggedIn()) {
			this.props.getFollowing(loggedInUserId);
		}
	}

	loggedIn(){
		return localStorage.getItem('imp-tok') && localStorage.getItem('imp-uid');
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