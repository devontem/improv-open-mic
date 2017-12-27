import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ForumThread from "./../components/ForumThread.jsx";



const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getThreadById: function(id){
			dispatch({
				type: 'GET_THREAD_POST',
				payload: axios.get('http://localhost:8080/api/forum/'+id)
			});
		},
		submitComment: function(form){
			dispatch({
				type: 'SUBMIT_THREAD_COMMENT',
				payload: axios.post('http://localhost:8080/api/forum/post-reply', form, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			})
			// getting new comments after submit
			.then(() => {
				dispatch({
					type: 'GET_THREAD_POST',
					payload: axios.get('http://localhost:8080/api/forum/' + form.parent_post_id)
				});
			});
		},
		deletePost: function(id, thread_id){
			dispatch({
				type: 'DELETE_FORUM_POST_REPLY',
				payload: axios.delete('http://localhost:8080/api/forum/post-reply/'+id, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			})
			.then(()=>{
				dispatch({
					type: 'GET_THREAD_POST',
					payload: axios.get('http://localhost:8080/api/forum/'+ thread_id)
				});
			});
		}
	}
};

class ForumThreadContainer extends Component {
	componentWillMount(){
		var id = this.props.match.params.id;
		this.props.getThreadById(id);
	}

	loggedIn(){
		return localStorage.getItem('imp-tok') && localStorage.getItem('imp-uid');
	}

	render(){
		return <ForumThread loggedInUser={localStorage.getItem('imp-uid')} loggedIn={this.loggedIn()} {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumThreadContainer);