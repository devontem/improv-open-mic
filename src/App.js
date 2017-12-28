import React, { Component } from 'react';
import { Route, IndexRoute, Router, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./containers/store";
import createBrowserHistory from 'history/createBrowserHistory';

import Layout from './components/Layout';
import ForumContainer from './containers/ForumContainer';
import NewForumPostContainer from './containers/NewForumPostContainer';
import ForumThreadContainer from './containers/ForumThreadContainer';
import SearchPageContainer from './containers/SearchPageContainer';
import CreateReviewContainer from './containers/CreateReviewContainer';
import ReviewContainer from './containers/ReviewContainer';
import CreateJamContainer from './containers/CreateJamContainer';
import JamPageContainer from './containers/JamPageContainer';
import JamViewContainer from './containers/JamViewContainer';
import ProfileContainer from './containers/ProfileContainer';
import LoginSignUpContainer from './containers/LoginSignupContainer';
import TagsContainer from './containers/TagsContainer';
import AccountContainer from './containers/AccountContainer';

const customHistory = createBrowserHistory();

class App extends Component {
  loggedIn(){
    return localStorage.getItem('imp-tok') && localStorage.getItem('imp-uid');
  }

  render() {
    return (
        <Provider store={store}>
          <Router history={customHistory}>
            <Layout loggedIn={this.loggedIn()}>
              <Route exact path="/forum" component={ForumContainer} />
              <Route exact path="/forum/new" component={NewForumPostContainer} />
              <Route exact path="/forum/thread/:id" component={ForumThreadContainer} />

              <Route exact path="/search" component={SearchPageContainer} />

              <Route exact path="/reviews/new" component={CreateReviewContainer} />
              <Route exact path="/reviews/id/:id" component={ReviewContainer} />

              <Route exact path="/jams" component={JamViewContainer} />
              <Route exact path="/jams/new" component={CreateJamContainer} />
              <Route exact path="/jams/id/:id" component={JamPageContainer} />
              <Route exact path="/countries" component={JamPageContainer}  />

              <Route exact path="/profile/:id" component={ProfileContainer}  />

              <Route exact path="/login" component={LoginSignUpContainer} />

              <Route exact path="/tags" component={TagsContainer} />
              <Route exact path="/account" component={AccountContainer} />
            </Layout>
          </Router>
        </Provider>
    );
  }
}

export default App;