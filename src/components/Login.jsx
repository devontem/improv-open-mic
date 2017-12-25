import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const Login = (props) => {
	return (
		<div>
			<FlatButton {...this.props} href="/login" label="Login" />
			<FlatButton {...this.props} href="/login?signup=true" label="Sign Up" />
		</div>
	);
};

export default Login;