import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../../../api/events/events';

import EditEvent from './EditEvent';

export default createContainer(({ eventId }) => {
  const subsHandler = Meteor.subscribe('polls.details', eventId);

  const event = Events.findOne({ _id: eventId });

  return {
    event,
    onUnmount: subsHandler.stop,
    loading: !subsHandler.ready(),
  };
}, EditEvent);
