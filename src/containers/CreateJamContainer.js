import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CreateJam from "./../components/CreateJam.jsx";

const mapStateToProps = (state, ownProps) => {
	return {
		...state // spread state properties
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		createJam: function(form){
			dispatch({
				type: 'CREATE_JAM',
				payload: axios.post('http://localhost:8080/api/open-mics', form, {
					headers: {'x-access-token': localStorage.getItem('imp-tok') }
				})
			})
		}
	}
};

class CreateJamContainer extends Component {
	render(){
		return <CreateJam {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJamContainer);