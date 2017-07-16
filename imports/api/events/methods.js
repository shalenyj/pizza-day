import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Groups } from '../groups/groups'
import { Events } from './events';
import { Orders } from '../orders/orders';
import { EventsSchema } from './EventsSchema';

export const createEvent = new ValidatedMethod({
  name: 'Event.create',
  validate: new SimpleSchema({
    event: { type: EventsSchema},
  }).validator(),

  run({ event }) {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You not able to create a new event');
    }

    const defaultEvent = {
      createdBy: userId,
      createdAt: new Date(),
      title: '',
      link: 'https://static1.squarespace.com/static/534d4d15e4b0458a1fec3b4e/t/53e0e908e4b08ac0a8ebeb81/1405613356537/events.png',
      status: 'ordering',
      participations: [],
    };

    const eventToAdd = { ...defaultEvent, ...event };

    return Events.insert(eventToAdd);
  },
});

export const updateEvent = new ValidatedMethod({
  name: 'Event.update',
  validate: new SimpleSchema({
    _id: { type: String },
    partToUpdate: { type: EventsSchema.pick('title', 'link') },
  }).validator(),

  run({ _id, partToUpdate }) {
    const event = Events.findOne({ _id, createdBy: this.userId });

    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You not able edit this event');
    }

    return Events.update({_id }, {$set: partToUpdate});
  },
});

export const updateEventParticipations = new ValidatedMethod({
  name: 'EventParticipations.update',
  validate: new SimpleSchema({
    _id: { type: String },
    participation: { type: String },
    add: { type: Boolean },
  }).validator(),

  run({ participation, add, _id }) {

    const event = Events.findOne({ _id });

    if (!add) {
      Events.update({ _id }, { $pull: { partisipations: participation } });
    } else {

      Events.update({ _id }, { $addToSet: { participations: participation } });
    }
  },
});

export const removeEvent = new ValidatedMethod({
  name: 'Event.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run({ _id }){
    const event = Events.findOne({ _id, createdBy:this.userId});

    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You not able  delete this event');
    }

    Orders.find({ eventId: _id}).forEach((order)=>{
      Meteor.call('Orders.remove',{ _id: order._id})});

    return Events.remove({ _id});
  },
});
