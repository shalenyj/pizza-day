import { Meteor } from 'meteor/meteor';

import { Row, Col } from 'react-flexbox-grid';

import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'react-md/lib/Avatars';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';

import LinkButton from '../LinkButton';


const GroupItem = ({ group }) => {
  const canEditGroup = group.createdBy === Meteor.userId();

  const listParticipations = group.participations.map((participation) =>
    // const user = Meteor.users.findOne({ _id: participation});
    // console.log(user.username);
    <ListItem primaryText={participation} />
  );

  const listMenu = group.menu.map((menu) =>
    <div>
      <ListItem primaryText={menu.name}>
        {menu.price}$
      </ListItem>
    </div>
  );

  return (
    <Col xs={6} className="m-b-15">
      <Card>
        <CardTitle
          avatar={<Avatar src={group.link} role="presentation" />}
          title={group.groupName} />
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
              {listMenu}
            </List>
          </ExpansionPanel>
        </ExpansionList>
        <CardActions>
          { canEditGroup && (
            <LinkButton
              flat
              primary
              to={`/edit-group/${group._id}`}
              label="Edit"
            />
          )}
        </CardActions>
      </Card>
    </Col>
  );
};

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupItem;
