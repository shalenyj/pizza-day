import { Meteor } from 'meteor/meteor';

import { Row, Col } from 'react-flexbox-grid';

import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';


import { Groups } from '../../../api/groups/groups';
import LinkButton from '../LinkButton';


const EventItem = ({ event }) => {
  const canEditEvent = event.createdBy === Meteor.userId();

  const canFinishEvent = event.createdBy === Meteor.userId() && event.status !== 'ordering';

  const listParticipations = event.participations.map((participation) =>
    // const user = Meteor.users.findOne({ _id: participation});
    // console.log(user.username);
    <ListItem primaryText={participation} />
  );

  // console.log(Groups.findOne())

  // const listMenu = event.menu.map((menu) =>
  //   <div>
  //     <ListItem primaryText={menu.name}>
  //       {menu.price}$
  //     </ListItem>
  //   </div>
  // );

  return (
    <Col xs={6} className="m-b-15">
      <Card>
        <CardTitle
          avatar={<Avatar src={event.link} role="presentation" />}
          title={event.title} >
          <p style={{ margin:'10px 10px 10px 60%'}} >Group:{event.groupId}</p>
        </CardTitle>
        <ExpansionList style={{ padding: 16 }}>
          <ExpansionPanel label="Participations" >
            <List >
              {listParticipations}
            </List>
          </ExpansionPanel>
          <ExpansionPanel label="Menu">
            <List >
              <ListItem primaryText="Name">
              Price $
              </ListItem>

            </List>
          </ExpansionPanel>
        </ExpansionList>
        <CardActions>
          { canEditEvent && (
            <LinkButton
              flat
              primary
              to={`/edit-event/${event._id}`}
              label="Edit"
            />)}
            { canFinishEvent && (
            <Button
              flat
              primary
              // onClick=
              label="Finish event"
            />
          )}
        </CardActions>
      </Card>
    </Col>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventItem;
