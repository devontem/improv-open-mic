import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap-grid/dist/grid.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import HappyFaceIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied';

import Logged from './components/Logged';
import Login from './components/Login';

class App1 extends Component {
  componentWillMount(){
    this.state = {
      logged: false
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
          title="Improv Jam Open Mics"
          iconElementLeft={<IconButton><HappyFaceIcon /></IconButton>}
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
          />

          <div className="container">
            <div className="col-sm-4"></div>
            <div className="col-sm-8"></div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App1;
