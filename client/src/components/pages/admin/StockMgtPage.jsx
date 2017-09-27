import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { newAuthorRequest } from '../../actions/newAuthorActions';
import {
  bookImageUpload,
  newBookRequest,
  checkAuthorsRequest,
} from '../../actions/newBookAction';
import NewBookForm from '../../NewBookForm';
import NewAuthorForm from '../../NewAuthorForm';


class StockMgtPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: 0,
    };
  }
  handleClick(event) {
    event.preventDefault();
    const tabContent = document.getElementsByClassName('tabs-item');
    for (let i = 0; i < tabContent.length; i += 1) {
      tabContent[i].style.display = 'none';
    }
    const tabbednav = document.getElementsByClassName('tabbednav');
    for (let i = 0; i < tabbednav.length; i += 1) {
      tabbednav[i].className = tabbednav[i].className.replace('active', '');
    }
    document.getElementById(event.target.name).style.display = 'block';
  }
  render() {
    const {
      newAuthorRequest,
      bookImageUpload,
      newBookRequest,
      checkAuthorsRequest
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
                <a
                  href=""
                  className="breadcrumbs--link -active"
                >
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
                    <a
                      href=""
                      name="NewBook"
                      onClick={this.handleClick}
                    >
                      Add New Book
                    </a>
                  </li>
                  <li className="tabbednav">
                    <a
                      href=""
                      name="NewAuth"
                      onClick={this.handleClick}
                    >
                      Add New Author
                    </a>
                  </li>
                  <li className="tabbednav">
                    <a
                      href=""
                      name="ManageBook"
                      onClick={this.handleClick}
                    >
                      Manage Books
                    </a>
                  </li>
                  <li className="tabbednav">
                    <a
                      href=""
                      name="DeleteBook"
                      onClick={this.handleClick}
                    >
                      Delete Books
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tabbed-content">
                <NewBookForm
                  bookImageUpload={bookImageUpload}
                  newBookRequest={newBookRequest}
                  checkAuthorsRequest={checkAuthorsRequest}
                />
                <NewAuthorForm
                  newAuthorRequest={newAuthorRequest}
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
  bookImageUpload: PropTypes.func.isRequired,
  newBookRequest: PropTypes.func.isRequired,
  checkAuthorsRequest: PropTypes.func.isRequired
};
export default connect(null,
  {
    newAuthorRequest,
    bookImageUpload,
    newBookRequest,
    checkAuthorsRequest
  })(StockMgtPage);
