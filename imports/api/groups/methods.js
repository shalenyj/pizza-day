import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Groups } from './groups';
import { GroupsSchema } from './GroupsSchema';
import { Events } from '../events/events';

export const createGroup = new ValidatedMethod({
  name: 'Group.create',
  validate: new SimpleSchema({
    group: { type: GroupsSchema },
  }).validator(),

  run({ group }) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('You are not able to add new group');
    }

    const defaultGroup = {
      createdBy: userId,
      createdAt: new Date(),
      groupName: 'New Group',
      link: 'https://image.freepik.com/free-icon/no-translate-detected_318-63105.jpg',
      participations: [],
      menu: [{ name: 'pizza', price: 10 }, { name: 'cola', price: 5 }, { name: 'peperoni', price: 15 }],
    };

    const groupToAdd = { ...defaultGroup, ...group };

    return Groups.insert(groupToAdd);
  },
});

export const updateGroup = new ValidatedMethod({
  name: 'Groups.update',
  validate: new SimpleSchema({
    _id: { type: String },
    partToUpdate: { type: GroupsSchema.pick(['groupName', 'link', 'menu.$.name', 'menu.$.price']) },
  }).validator(),

  run({ _id, partToUpdate }) {
    const group = Groups.findOne({ _id, createdBy: this.userId });

    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You are not able to edit this group');
    }

    return Groups.update({ _id }, { $set: partToUpdate });
  },
});

export const UpdateParticipations = new ValidatedMethod({
  name: 'GroupParticipations.update',
  validate: new SimpleSchema({
    _id: { type: String },
    participation: { type: String },
    add: { type: Boolean },
  }).validator(),

  run({ participation, add, _id }) {

    const group = Groups.findOne({ _id });

    if (!add) {
      Groups.update({ _id }, { $pull: { partisipations: participation } });
    } else {

      Groups.update({ _id }, { $addToSet: { participations: participation } });
    }
  },
});

export const removeGroup = new ValidatedMethod({
  name: 'Groups.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run({ _id }) {
    const group = Groups.findOne({ _id, createdBy: this.userId});
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You are not able to delete this group');
    }

    Events.find({ groupId: _id }).forEach((event) => {
      Meteor.call('Events.remove', { _id: event._id });
    });

    return Groups.remove({ _id });
  },
});
