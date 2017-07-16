import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Groups } from './groups';
import { Events } from '../events/events';
import { Orders } from '../orders/orders';

Meteor.publish('groups.User', function groupsUser() {
  if (!this.userId) {
    return this.ready();
  }

  return Groups.find(
    { $or: [{ participations: { $in: [this.userId] } }, { createdBy: this.userId }] });
});

Meteor.publishComposite('groups.details', function groupsDetails(groupId) {
  check(groupId, String);

  const { userId } = this;

  if (!userId) {
    return this.ready();
  }

  return {
    find() {
      return Groups.find({ _id: groupId })
    },

    children: [
      {
        find(group) {
          return Events.find({ groupId: group._id });
        },
      },
    ],
  };
});
