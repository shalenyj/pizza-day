import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Events } from './events';
import { Orders } from '../orders/orders';

Meteor.publish('events.User', function eventsUser() {
  if (!this.userId) {
    return this.ready();
  }

  return Events.find(
    { $or: [{ participations: { $in: [this.userId] } }, { createdBy: this.userId }] });
});


Meteor.publishComposite('events.details', function eventsDetails(eventId) {
  check(eventId, String);

  const { userId } = this;

  if (!userId) {
    return this.ready();
  }

  return {
    find() {
      return Events.find({ _id: eventId });
    },
    children: [
      {
        find(event) {
          return Orders.find({ eventId: event._id });
        },
      },
    ],
  }
});
