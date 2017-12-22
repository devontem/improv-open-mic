import React, { Component } from 'react';
import { Route, IndexRoute, Router, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./containers/store";
import createBrowserHistory from 'history/createBrowserHistory';

import Layout from './components/Layout';
import ForumContainer from './containers/ForumContainer';

const customHistory = createBrowserHistory();

class App extends Component {
  componentWillMount(){
    this.state = {
      logged: false
    };
  }

  render() {
    return (
        <Provider store={store}>
          <Router history={customHistory}>
            <Layout>
              <Route path="/forum" component={ForumContainer} />
            </Layout>
          </Router>
        </Provider>
    );
  }
}

export default App;