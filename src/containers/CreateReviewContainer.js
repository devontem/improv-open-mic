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
                	dataType: 'json'
				})
			});
		}
	}
};

class CreateReviewContainer extends Component {
	render(){
		return <CreateReview {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReviewContainer);