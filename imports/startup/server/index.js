import './register-api';

import { Meteor } from 'meteor/meteor';

import { ServiceConfiguration } from 'meteor/service-configuration'
import { Accounts } from 'meteor/accounts-base';

ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '1923126584626706',
    secret: '28f2cd36ad2cd652584db23101f25bb7'
});

ServiceConfiguration.configurations.remove({
    service: "google"
});

ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: '654517082667-luj0dknavof3cfa1aics7ievqa06cvae.apps.googleusercontent.com',
    secret: '9RRgV3pHIHAXMiHn9XDcMlr0'
});

Accounts.onCreateUser(function (options, user) {

    if (!user.services.facebook ) {
      if(!user.services.google){
        return user;
      }
      user.username = user.services.google.login;
      user.emails = [{address: user.services.google.email}];

      return user;
    }
    user.username = user.services.facebook.name;
    user.emails = [{address: user.services.facebook.email}];

    return user;
});
