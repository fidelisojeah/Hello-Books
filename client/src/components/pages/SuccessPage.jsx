import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from '../flash/FlashMessage';

/**
 * @param {object} props
 * @returns {JSX}
 */
function SuccessPage(props) {
  const messages = props.messages.map(message =>
    <FlashMessage key={message.id} message={message} />,
  );
  return (
    <div className="layout--container">
      <div className="layout-header">
        <h1 className="page_header--title -black -top-picks">
          {messages}
        </h1>
      </div>
      <div className="section">
        <div className="container">
          <div className="innerSection" />
        </div>
      </div>
    </div>
  );
}
SuccessPage.propTypes = {
  messages: PropTypes.array.isRequired,
};
/**
 * @param {object} state
 */
function mapStateToProps(state) {
  return {
    messages: state.flashMessages,
  };
}

export default connect(mapStateToProps)(SuccessPage);
