import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import { updateEvent, removeEvent, updateEventParticipations } from '../../../api/events/methods';
import { handleResult } from '../../../utils/handle-result';
import EditEventInfo from './EditEventInfo';
import LinkButton from '../LinkButton';

class EditEvent extends React.Component {
  constructor(props) {
    super(props);

    this.updateParticipations = this.updateParticipations.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.onEventRemove = this.onEventRemove.bind(this);
  }

  onEventRemove() {
    removeEvent.call({ _id: this.props.eventId }, handleResult(() => {
      this.context.router.push('my-events');
    }));
  }

  updateEvent(field) {
    return (value) => {
      const updatedEvent = {
        _id: this.props.eventId,
        partToUpdate: { [field]: value },
      };

      updateEvent.call(updatedEvent, handleResult());
    };
  }

  updateParticipations(participation, result) {
    const updatedParticipations = {
      _id: this.props.eventId,
      participation,
      add: result,
    };
    updateEventParticipations.call(updatedParticipations, handleResult());
  }

  render() {
    const { event } = this.props;

    return (
    <div>
      { event && (<Row>
        <Col xs={12} md={6} sm={8} mdOffset={3} smOffset={2}>
          <EditEventInfo
            event={event}
            onParticipationsUpdate={this.updateParticipations}
            onEventUpdate={this.updateEvent}
            onEventRemove={this.onEventRemove}
          />
        </Col>
        <LinkButton fixed floating primary to="/my-events">save</LinkButton>
      </Row>
    )}
    </div>
    );
  }
}

EditEvent.defaultProps = {
  event: {},
};


EditEvent.propTypes = {
  eventId: PropTypes.string.isRequired,
  onUnmount: PropTypes.func.isRequired,
  event: PropTypes.object,
};


EditEvent.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default EditEvent;
