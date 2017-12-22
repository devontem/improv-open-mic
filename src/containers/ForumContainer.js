import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Forum from "./../components/Forum.jsx";

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
	}
};

class ForumContainer extends Component {
	componentWillMount(){
	}

	render(){
		return <Forum {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumContainer);