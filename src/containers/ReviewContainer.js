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
		}
	}
};

class ReviewContainer extends Component {
	componentWillMount(){
		var id = this.props.match.params.id;
		this.props.getReviewById(id);
	}

	render(){
		return <Review {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContainer);