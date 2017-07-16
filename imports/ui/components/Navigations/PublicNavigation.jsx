import React from 'react';

import NavButton from './NavButton';

import Toolbar from 'react-md/lib/Toolbars';

const navButton = (
  <NavButton icon iconName="local_pizza" to="/"/>
);

const actions = [
  <NavButton flat to="/sign-in" label="Sign In" />,
  <NavButton flat to="/sign-up" label="Sign Up" />
];

const PublicNavigation = () => (
  <Toolbar
    colored
    title="Pizzaa Day"
    nav={navButton}
    actions={actions}
  />
);


export default PublicNavigation;
