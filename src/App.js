import React, { Component } from 'react';
import { Route, IndexRoute, Router, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./containers/store";
import createBrowserHistory from 'history/createBrowserHistory';

import Layout from './components/Layout';
import ForumContainer from './containers/ForumContainer';
import NewForumPostContainer from './containers/NewForumPostContainer';

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
              <Route exact path="/forum" component={ForumContainer} />
              <Route path="/forum/new" component={NewForumPostContainer} />
            </Layout>
          </Router>
        </Provider>
    );
  }
}

export default App;