import React from 'react';

import { Meteor } from 'meteor/meteor';

import Toolbar from 'react-md/lib/Toolbars';

import NavButton from './NavButton';

const logout = () => Meteor.logout();

const navButton = (
  <NavButton icon iconName="local_pizza" to="/my-groups"/>
);
const actions = [
  <NavButton flat to="/my-events" label="My Events" />,
  <NavButton flat to="/my-groups" label="My Groups" />,

  <NavButton icon iconName="highlight_off" onClick={logout}/>,
];

const AuthNavigation = () => (
  <Toolbar
    colored
    title="Pizza Day"
    nav={navButton}
    actions={actions}
  />
);


export default AuthNavigation;
