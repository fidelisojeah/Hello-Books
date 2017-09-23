import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { newAuthorRequest } from '../../actions/newAuthorActions';
import { addFlashMessage } from '../../actions/flashMessages';
import NewBookForm from '../../NewBookForm';
import NewAuthorForm from '../../NewAuthorForm';


class StockMgtPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: 0,
    };
  }
  render() {
    const {
      newAuthorRequest,
      addFlashMessage
    } = this.props;
    return (
      <div className="layout--container">
        <div className="layout-header">
          <div className="container">
            <h1 className="page_header--title">
              Stock Management
            </h1>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs--list">
              <li className="breadcrumbs--item">
                <a href="/" className="breadcrumbs--link">
                  Home
                </a>
              </li>
              <li className="breadcrumbs--item">
                <a href="/" className="breadcrumbs--link -active">
                  Stock Management
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="section">
          <div className="container">
            <div className="innerSection">
              <div className="tabbed-header">
                <ul className="tb">
                  <li className="tabbednav active">
                    <a href="">
                      Add New Book
                    </a>
                  </li>
                  <li className="tabbednav">
                    <a href="">
                      Add New Author
                    </a>
                  </li>
                  <li className="tabbednav">
                    <a href="">
                      Manage Books
                    </a>
                  </li>
                  <li className="tabbednav">
                    <a href="">
                      Delete Books
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tabbed-content">
                <NewBookForm />
                <NewAuthorForm
                  newAuthorRequest={newAuthorRequest}
                  addFlashMessage={addFlashMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
StockMgtPage.propTypes = {
  newAuthorRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};
export default connect(null,
  { newAuthorRequest, addFlashMessage })(StockMgtPage);
