import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import NewForumPost from "./../components/NewForumPost.jsx";

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		createForumPost: function(form){
			dispatch({
				type: 'CREATE_FORUM_POST',
				payload: axios.post('http://localhost:8080/api/forum', form, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			});
		}
	}
};

class NewForumPostContainer extends Component {
	render(){
		return <NewForumPost {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewForumPostContainer);