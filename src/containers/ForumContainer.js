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
				payload: axios.get('http://localhost:8080/api/forum')
			});
		}
	}
};

class ForumContainer extends Component {
	componentWillMount(){
		this.props.getForumPosts();
	}

	render(){
		return <Forum {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumContainer);