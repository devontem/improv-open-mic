import React from 'react';
import 'bootstrap-grid/dist/grid.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import HappyFaceIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import 'bootstrap-grid/dist/grid.min.css';
import './../assets/styles.css';

import Logged from './Logged';
import Login from './Login';
import Menu from './Menu';

const Layout = (props) => {
	var loggedIn = localStorage.getItem('imp-tok') && localStorage.getItem('imp-uid');
	return (
		<MuiThemeProvider>
			<div>
				<AppBar
				title={<a className="app-bar-title" style={{fontFamily: "'Open Sans', sans-serif", fontWeight: 'bold'}} href="/">Improv Jam Open Mics</a>}
				iconElementLeft={<IconButton><HappyFaceIcon /></IconButton>}
				iconElementRight={loggedIn ? <Logged {...this.props} /> : <Login />}
				/>

				<div className="container-fluid">
					<div style={{ marginTop: '30px' }}>
						<div className="col-sm-3"><Menu loggedIn={loggedIn} /></div>
						<div className="col-sm-9">{props.children}</div>
					</div> 
				</div>
			</div>
		</MuiThemeProvider>
	);
}

export default Layout;