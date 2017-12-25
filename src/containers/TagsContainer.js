import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Tags from "./../components/Tags.jsx";

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getUsedTags: function(form){
			dispatch({
				type: 'GET_USED_TAGS',
				payload: axios.get('http://localhost:8080/api/reviews/tags/used')
			});
		}
	}
};

class TagsContainer extends Component {
	componentWillMount(){
		this.props.getUsedTags();
	}

	render(){
		return <Tags {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);