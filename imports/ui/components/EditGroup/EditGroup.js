import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import { updateGroup, removeGroup, UpdateParticipations } from '../../../api/groups/methods';
import { handleResult } from '../../../utils/handle-result';
import EditGroupInfo from './EditGroupInfo';
import LinkButton from '../LinkButton';

class EditGroup extends React.Component {
  constructor(props) {
    super(props);

    this.updateParticipations = this.updateParticipations.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
    this.onGroupRemove = this.onGroupRemove.bind(this);
  }

  onGroupRemove() {
    removeGroup.call({ _id: this.props.groupId }, handleResult(() => {
      this.context.router.push('my-groups');
    }));
  }

  updateGroup(field) {
    return (value) => {
      const updatedGroup = {
        _id: this.props.groupId,
        partToUpdate: { [field]: value },
      };

      updateGroup.call(updatedGroup, handleResult());
    };
  }

  updateParticipations(participation, result) {
    const updatedParticipations = {
      _id: this.props.groupId,
      participation,
      add: result,
    };
    UpdateParticipations.call(updatedParticipations, handleResult());
  }

  render() {
    const { group } = this.props;

    return (
    <div>
      { group && (<Row>
        <Col xs={12} md={6} sm={8} mdOffset={3} smOffset={2}>
          <EditGroupInfo
            group={group}
            onParticipationsUpdate={this.updateParticipations}
            onGroupUpdate={this.updateGroup}
            onGroupRemove={this.onGroupRemove}
          />
        </Col>
        <LinkButton fixed floating primary>save</LinkButton>
      </Row>
    )}
    </div>
    );
  }
}

EditGroup.defaultProps = {
  group: {},
};


EditGroup.propTypes = {
  groupId: PropTypes.string.isRequired,
  onUnmount: PropTypes.func.isRequired,
  group: PropTypes.object,
};


EditGroup.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default EditGroup;
