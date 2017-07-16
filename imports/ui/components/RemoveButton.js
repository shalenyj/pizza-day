import React from 'react';
import PropTypes from 'prop-types';

import FontIcon from 'react-md/lib/FontIcons/FontIcon';

const RemoveButton = ({ onRemove, className }) => (
  <FontIcon
    onClick={onRemove}
    className={`pointer ${className}`}
  >
    delete
  </FontIcon>
);

RemoveButton.defaultProps = {
  className: '',
};

RemoveButton.propTypes = {
  onRemove: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default RemoveButton;
