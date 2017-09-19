import React from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends React.Component {
  render() {
    const { id, type, text } = this.props.message;
    return (
      <div
        className={classnames({ 'log-errors': type === 'Unsuccessful' })}
      >
        {text}
      </div>
    );
  }
}
FlashMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FlashMessage;
