import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from '../flash/FlashMessage';

// const SuccessPage = () => {
class SuccessPage extends React.Component {
  render() {
    console.log(this.props);
    const messages = this.props.messages.map(message =>
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
}
SuccessPage.propTypes = {
  messages: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    messages: state.flashMessages,
  };
}

export default connect(mapStateToProps)(SuccessPage);
