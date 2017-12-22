import React, { Component } from 'react';
import 'bootstrap-grid/dist/grid.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import HappyFaceIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import 'bootstrap-grid/dist/grid.min.css';

import Logged from './Logged';
import Login from './Login';
import Menu from './Menu';

const Layout = (props) => {
	console.log(props.children);
	return (
		<MuiThemeProvider>
			<div>
				<AppBar
				title="Improv Jam Open Mics"
				iconElementLeft={<IconButton><HappyFaceIcon /></IconButton>}
				iconElementRight={props.logged ? <Logged /> : <Login />}
				/>

				<div className="container-fluid">

					{ (props.showMenu || true) ?
						<div style={{ marginTop: '30px' }}>
							<div className="col-sm-3"><Menu /></div>
							<div className="col-sm-9">{props.children}</div>
						</div> :
						<div>
							<div className="col-sm-12">{props.children}</div>
						</div>
					}
					<div className="col-sm-4"></div>
					<div className="col-sm-8"></div>
				</div>
			</div>
		</MuiThemeProvider>
	);
}

export default Layout;