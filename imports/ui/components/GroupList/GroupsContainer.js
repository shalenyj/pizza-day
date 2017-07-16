import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Groups } from '../../../api/groups/groups';
import GroupsList from './GroupsList';

export default createContainer(() => {
  const subsHandler = Meteor.subscribe('groups.User');

  return {
    loading: !subsHandler.ready(),
    groups: Groups.find({}, { sort: { createdAt: -1 } }).fetch(),
    onUnmount: subsHandler.stop,
  };
}, GroupsList);
