import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap-grid/dist/grid.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Layout from './components/Layout';

class App1 extends Component {
  componentWillMount(){
    this.state = {
      logged: false
    };
  }

  render() {
    return (
      <MuiThemeProvider>
          <Layout logged={this.state.logged} showMenu={true} />
      </MuiThemeProvider>
    );
  }
}

export default App1;
