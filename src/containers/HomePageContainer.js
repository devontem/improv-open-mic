import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import HomePage from "./../components/HomePage.jsx";

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getHomepage: function(id){
			dispatch({
				type: 'GET_HOME_PAGE',
				payload: axios.get('http://localhost:8080/api/open-mics/homepage')
			});
		}
	}
};

class HomePageContainer extends Component {
	componentWillMount(){
		this.props.getHomepage();
	}

	render(){
		return <HomePage {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);