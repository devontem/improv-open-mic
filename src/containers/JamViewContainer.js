import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import JamView from "./../components/JamView.jsx";
const queryString = require('query-string');

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getJams: function(id){
			dispatch({
				type: 'GET_OPEN_MICS',
				payload: axios.get('/api/open-mics/')
			});
		}
	}
};

class JamViewContainer extends Component {

	componentWillMount(){
		this.props.getJams();
	}

	render(){
		const parsed = queryString.parse(this.props.location.search);
		return <JamView {...this.props} groupByCountry={parsed.country === 'true'} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(JamViewContainer);