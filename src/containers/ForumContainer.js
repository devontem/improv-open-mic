import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Forum from "./../components/Forum.jsx";

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getForumPosts: function(){
			dispatch({
				type: 'GET_FORUM_POSTS',
				payload: axios.get('/api/forum')
			});
		},
		deletePost: function(id){
			dispatch({
				type: 'DELETE_FORUM_POSTS',
				payload: axios.delete('/api/forum/'+id, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			})
			.then(()=>{
				dispatch({
					type: 'GET_FORUM_POSTS',
					payload: axios.get('/api/forum')
				});
			});
		}
	}
};

class ForumContainer extends Component {
	componentWillMount(){
		this.props.getForumPosts();
	}

	loggedIn(){
		return localStorage.getItem('imp-tok') && localStorage.getItem('imp-uid');
	}

	render(){
		return <Forum loggedInUser={localStorage.getItem('imp-uid')} loggedIn={this.loggedIn()} {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumContainer);