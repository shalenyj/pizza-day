import React from 'react';
import PropTypes from 'prop-types';

import EditGroupContainer from '../components/EditGroup/EditGroupContainer';

const EditGroupPage = ({ params: { _id } }) => (
  <div>
    <h1 className="md-text-center">Edit Group</h1>

    <EditGroupContainer groupId={_id} />

  </div>
);

EditGroupPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default EditGroupPage;
