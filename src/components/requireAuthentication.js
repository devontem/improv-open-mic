import React from 'react';

const requireAuthentication = function(Component){

	class AuthenticatedComponent extends React.Component {
		checkAuth() {
			var userId = localStorage.getItem('imp-uid');
			var token = localStorage.getItem('imp-tok');

			// if there is uid & token in local storage, retrieve user info
			console.log(userId, token);
			return true
	    }

	    render() {

			return (
				<div>
					{ this.checkAuth() ? <Component {...this.props}/> : null}
				</div>)
		}
	}
}

export default requireAuthentication;