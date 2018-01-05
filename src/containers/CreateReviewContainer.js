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
				payload: axios.post('/api/reviews', form, {
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
				payload: axios.get('/api/open-mics/')
			});
		},
		getTags: function(id){
			dispatch({
				type: 'GET_TAGS',
				payload: axios.get('/api/reviews/tags/')
			});
		}
	}
};

class CreateReviewContainer extends Component {
	componentWillMount(){
		this.props.getJams();
		this.props.getTags();
	}

	loggedIn(){
		return localStorage.getItem('imp-tok') && localStorage.getItem('imp-uid');
	}

	render(){
		return <CreateReview loggedIn={this.loggedIn()}  {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReviewContainer);