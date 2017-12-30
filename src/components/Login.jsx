import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const Login = (props) => {
	return (
		<div style={{color: 'white'}}>
			<FlatButton style={{color: 'white'}} {...this.props} href="/login" label="Login" />
			<FlatButton style={{color: 'white'}} {...this.props} href="/login?signup=true" label="Sign Up" />
		</div>
	);
};

export default Login;