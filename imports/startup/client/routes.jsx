import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';

import MainLayout from '../../ui/layouts/MainLayout';
import AuthLayout from '../../ui/layouts/AuthLayout';

import App from '../../ui/pages/App';
import SignInPage from '../../ui/pages/SignInPage';
import SignUpPage from '../../ui/pages/SignUpPage';
import MyGroups from '../../ui/pages/MyGroups';
import MyEvents from '../../ui/pages/MyEvents';
import NotFoundPage from '../../ui/pages/NotFoundPage';
import EditGroupPage from '../../ui/pages/EditGroupPage';
import EditEventPage from '../../ui/pages/EditEventPage';


const publicRoutes = ['/', '/sign-in', 'sign-up'];
const commonRoutes = ['/not-found'];


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={App} publicRoutes={publicRoutes} commonRoutes={commonRoutes}>
      <Route component={MainLayout}>
        <Route path="/" component={SignInPage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />

      </Route>

      <Route component={AuthLayout}>
        <Route path="/my-groups" component={MyGroups} />
      <Route path="/my-events" component={MyEvents} />
      <Route path="/edit-group/:_id" component={EditGroupPage} />
    <Route path="/edit-event/:_id" component={EditEventPage} />

      </Route>
    </Route>
  </Router>
);
