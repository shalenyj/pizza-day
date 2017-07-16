import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-flexbox-grid';

import { handleResult } from '../../../utils/handle-result';
import { createEvent } from '../../../api/events/methods';

import EventItem from './EventItem';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';

class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.createEvent = this.createEvent.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  createEvent(event) {
    event.preventDefault();
    createEvent.call({ event: {} }, handleResult((eventId) => {
      this.context.router.push(`edit-event/${eventId}`);
    }));
  }

  render() {
    const { events } = this.props;
    return (
      <div>
        <Row>
          {events.length === 0 && <NoItems />}
          {events.length > 0 && events.map(event => (
            <EventItem
              key={event._id}
              event={event}
            />
          ))}
        </Row>
        <LinkButton floating fixed primary onClick={this.createEvent}>add</LinkButton>
      </div>
    );
  }
}


MyEvents.propTypes = {
  events: PropTypes.array.isRequired,
  onUnmount: PropTypes.func.isRequired,
};


MyEvents.contextTypes = {
  router: PropTypes.object.isRequired,
};


export default MyEvents;
