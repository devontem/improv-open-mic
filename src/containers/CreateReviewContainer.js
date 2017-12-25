import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CreateReview from "./../components/CreateReview.jsx";

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		createReview: function(form){
			dispatch({
				type: 'CREATE_REVIEW',
				payload: axios.post('http://localhost:8080/api/reviews', form, {
					processData: false,
                	contentType: false,
                	dataType: 'json',
                	headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			});
		},
		getJams: function(id){
			dispatch({
				type: 'GET_OPEN_MICS',
				payload: axios.get('http://localhost:8080/api/open-mics/')
			});
		},
		getTags: function(id){
			dispatch({
				type: 'GET_TAGS',
				payload: axios.get('http://localhost:8080/api/reviews/tags/')
			});
		}
	}
};

class CreateReviewContainer extends Component {
	componentWillMount(){
		this.props.getJams();
		this.props.getTags();
	}
	render(){
		return <CreateReview {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReviewContainer);