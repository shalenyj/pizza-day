import React from 'react';
import PropTypes from 'prop-types';

import EditEventContainer from '../components/EditEvent/EditEventContainer';

const EditEventPage = ({ params: { _id } }) => (
  <div>
    <h1 className="md-text-center">Edit Event</h1>

    <EditEventContainer eventId={_id} />

  </div>
);

EditEventPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default EditEventPage;
