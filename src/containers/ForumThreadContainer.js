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
				payload: axios.post('http://localhost:8080/api/forum/post-reply', form)
			})
			// getting new comments after submit
			.then(() => {
				dispatch({
					type: 'GET_THREAD_POST',
					payload: axios.get('http://localhost:8080/api/forum/' + form.parent_post_id)
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

	render(){
		return <ForumThread {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumThreadContainer);