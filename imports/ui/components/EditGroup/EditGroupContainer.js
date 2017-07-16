import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Groups } from '../../../api/groups/groups';

import EditGroup from './EditGroup';

export default createContainer(({ groupId }) => {
  const subsHandler = Meteor.subscribe('polls.details', groupId);

  const group = Groups.findOne({ _id: groupId });

  return {
    group,
    onUnmount: subsHandler.stop,
    loading: !subsHandler.ready(),
  };
}, EditGroup);
