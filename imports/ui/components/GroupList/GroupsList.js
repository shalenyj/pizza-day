import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-flexbox-grid';

import { handleResult } from '../../../utils/handle-result';
import { createGroup } from '../../../api/groups/methods';

import GroupItem from './GroupItem';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';

class MyGroups extends React.Component {
  constructor(props) {
    super(props);
    this.createGroup = this.createGroup.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  createGroup(event) {
    event.preventDefault();
    createGroup.call({ group: {} }, handleResult((groupId) => {
      this.context.router.push(`edit-group/${groupId}`);
    }));
  }

  render() {
    const { groups } = this.props;

    return (
      <div>
        <Row>
          {groups.length === 0 && <NoItems />}
          {groups.length > 0 && groups.map(group => (
            <GroupItem
              key={group._id}
              group={group}
            />
          ))}
        </Row>
        <LinkButton floating fixed primary onClick={this.createGroup}>add</LinkButton>
      </div>
    );
  }
}


MyGroups.propTypes = {
  groups: PropTypes.array.isRequired,
  onUnmount: PropTypes.func.isRequired,
};


MyGroups.contextTypes = {
  router: PropTypes.object.isRequired,
};


export default MyGroups;
