import { Meteor } from 'meteor/meteor';

import { Orders } from './orders';

Meteor.publish('orders.User', function ordersUser () {
  if (!this.userId) {
    return this.ready();
  }

  return Orders.find({ createdBy: this.userId });
});
