import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Review from "./../components/Review.jsx";

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getReviewById: function(id){
			dispatch({
				type: 'GET_REVIEW',
				payload: axios.get('http://localhost:8080/api/reviews/'+id)
			});
		},
		submitComment: function(form){
			dispatch({
				type: 'SUBMIT_REVIEW_REPLY_COMMENT',
				payload: axios.post('http://localhost:8080/api/reviews/review-reply', form, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			})
			// getting new comments after submit
			.then(() => {
				dispatch({
					type: 'GET_REVIEW',
					payload: axios.get('http://localhost:8080/api/reviews/' + form.review_id)
				});
			});
		},
		deleteComment(id, review_id){
			console.log('id being deleted', id, review_id)
			dispatch({
				type: 'DELETE_REVIEW_REPLY',
				payload: axios.delete('http://localhost:8080/api/reviews/review-reply/' + id, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			})
			.then(() => {
				dispatch({
					type: 'GET_REVIEW',
					payload: axios.get('http://localhost:8080/api/reviews/'+review_id)
				});
			});
		}
	}
};

class ReviewContainer extends Component {
	componentWillMount(){
		var id = this.props.match.params.id;
		this.props.getReviewById(id);
		console.log(this.props)
	}

	loggedIn(){
		return localStorage.getItem('imp-tok') && localStorage.getItem('imp-uid');
	}

	render(){
		return <Review loggedIn={this.loggedIn()} {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContainer);