import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import SearchPage from "./../components/SearchPage.jsx";

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getOpenMics: function(){
			dispatch({
				type: 'GET_OPEN_MICS',
				payload: axios.get('/api/open-mics/')
			});
		}
	}
};

class SearchPageContainer extends Component {
	componentWillMount(){
		this.props.getOpenMics();
	}
	render(){
		return <SearchPage {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageContainer);