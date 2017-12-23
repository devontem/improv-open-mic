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

//<Route path="/reviews/new" component={CreateReviewContainer} />
  // fields, drag and drop image, add tags, redirect to review page
//<Route path="/reviews/:id" component={ReviewContainer} />
  // show review, image, tags, link to go to jam page

//<Route path="/jam/new" component={CreateJamContainer} />
  // jam details
//<Route path="/jam/:id" component={JamPageContainer} />
  // show all reviews for jam, show some quick stats (city, location, end start, etc), all the images for the jam

//<Route path="/login" component={LoginContainer} />
  // login and sign up --> auth in backend and front end -- commenting, editing profile, creating reviews/jams
//<Route path="/settings" component={SettingsContainer} />
  // simple page to change name, email, photo

//<Route path="/profile/:id" component={ProfileContainer} />
  // avatar, following, followers, my reviews, details about me
//<Route path="/followers" component={FollowingContainer} />
//<Route path="/following" component={FollowersContainer} />
//<Route path="/my-reviews" component={MyReviewsContainer} />
//<Route path="/social" component={SocialContainer} />
  // latest reviews, signed up users, photos

//homepage
  //data visualization

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
              <Route exact path="/forum/new" component={NewForumPostContainer} />
              <Route path="/forum/thread/:id" component={ForumThreadContainer} />

              <Route path="/search" component={SearchPageContainer} />

              <Route path="/reviews/new" component={CreateReviewContainer} />
            </Layout>
          </Router>
        </Provider>
    );
  }
}

export default App;