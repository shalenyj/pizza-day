import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import Button from 'react-md/lib/Buttons/Button';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import TextField from 'react-md/lib/TextFields/TextField';

import Events from '../../../api/events/events';
import RemoveButton from '../RemoveButton';

const EditEventInfo = ({ event, onEventUpdate, onEventRemove, onParticipationsUpdate }) => {
  const listParticipations = event.participations.map((participation) =>
    // const user = Meteor.users.findOne({ _id: participation});
    // console.log(user.username);
    <div>
      <ListItem primaryText={participation}>
        <Button
          icon
          onClick={onParticipationsUpdate(participation, false)} >
          delete
        </Button>
      </ListItem>
    </div>
  );

  return (
    <div>
      <Row>
        <Col xs={12}>
          <TextField
            id="event-name"
            placeholder="Event Name"
            size={8}
            value={event.title}
            onChange={onEventUpdate('title')}
            rightIcon={<RemoveButton onRemove={onEventRemove} />}
          />
          <TextField
            id="event-link"
            placeholder="Photolink"
            size={10}
            value={event.link}
            onChange={onEventUpdate('link')}
          />
        </Col>
        <Col xs={12}>
          <ExpansionList style={{ padding: 16 }} >
            <ExpansionPanel label="Participations" >
              <List >
                {listParticipations}
              </List>
            </ExpansionPanel>
            {/* <ExpansionPanel label="Menu">
              <List >
                <ListItem primaryText="Name">
                  Price $
               </ListItem>
                {listMenu}
              </List>
            </ExpansionPanel> */}
          </ExpansionList>
        </Col>
      </Row>
    </div>
  );
}


EditEventInfo.propTypes = {
  event: PropTypes.object.isRequired,
  onEventUpdate: PropTypes.func.isRequired,
  onEventRemove: PropTypes.func.isRequired,
  onParticipationsUpdate: PropTypes.func.isRequired,
};


export default EditEventInfo;
