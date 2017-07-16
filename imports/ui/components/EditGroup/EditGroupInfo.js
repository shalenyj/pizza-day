import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import Button from 'react-md/lib/Buttons/Button';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import TextField from 'react-md/lib/TextFields/TextField';

import Groups from '../../../api/groups/groups';
import RemoveButton from '../RemoveButton';

const EditGroupInfo = ({ group, onGroupUpdate, onGroupRemove, onParticipationsUpdate }) => {
  const listParticipations = group.participations.map((participation) =>
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

  const listMenu = group.menu.map((menu) =>
    <div>
      <ListItem primaryText="*">
        <TextField
          id="singleRightTitle"
          placeholder="Name"
          size={10}
          value={menu.name}
          onChange={onGroupUpdate('menu.$.name')}
          lineDirection="left"
          className="md-cell md-cell--bottom"
        />
        <TextField
          id="singleRightTitle"
          placeholder="Name"
          size={10}
          value={menu.price}
          onChange={onGroupUpdate('menu.$.price')}
          lineDirection="left"
          className="md-cell md-cell--bottom"
        />
      </ListItem>
    </div>
);

  return(
    <div>
      <Row>
        <Col xs={12}>
          <TextField
            id="group-name"
            placeholder="Group Name"
            size={8}
            value={group.groupName}
            onChange={onGroupUpdate('groupName')}
            rightIcon={<RemoveButton onRemove={onGroupRemove} />}
          />
          <TextField
            id="group-link"
            placeholder="Photolink"
            size={10}
            value={group.link}
            onChange={onGroupUpdate('link')}
          />
        </Col>
        <Col xs={12}>
          <ExpansionList style={{ padding: 16 }} >
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
        </Col>
      </Row>
    </div>
  );
}


EditGroupInfo.propTypes = {
  group: PropTypes.object.isRequired,
  onGroupUpdate: PropTypes.func.isRequired,
  onGroupRemove: PropTypes.func.isRequired,
  onParticipationsUpdate: PropTypes.func.isRequired,
};


export default EditGroupInfo;
