import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Jam from "./../components/Jam.jsx";

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getJamById: function(id){
			dispatch({
				type: 'GET_JAM',
				payload: axios.get('http://localhost:8080/api/open-mics/'+id)
			});
		}
	}
};

class JamPageContainer extends Component {
	componentWillMount(){
		var id = this.props.match.params.id;
		this.props.getJamById(id);
	}

	render(){
		return <Jam {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(JamPageContainer);