import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { newAuthorRequest } from '../../actions/authorActions';
import {
  bookImageUpload,
  newBookRequest,
  checkAuthorsRequest
} from '../../actions/newBookAction';

import NewBookForm from '../../NewBookForm';
import NewAuthorForm from '../../NewAuthorForm';
import BreadCrumbs from '../../common/BreadCrumbs';
import LayoutHeader from '../../common/LayoutHeader';


class StockMgtPage extends React.Component {
  constructor(props) {
    super(props);
    const pageLinks = [];

    pageLinks.push({
      linkName: 'Home',
      link: ''
    });
    pageLinks.push({
      linkName: 'Stock Management',
      link: 'bookmgt'
    });
    this.state = {
      pageLinks
    };
  }
  componentDidMount() {
    if (!this.props.isAdmin) {
      this.context.router.history.push('/books');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isAdmin) {
      this.context.router.history.push('/books');
    }
  }
  handleClick = (event) => {
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
    event.target.parentNode.classList.add('active');
  }

  render() {
    return (
      <div className="layout--container">
        <LayoutHeader
          headerTitle="Stock Management"
        />
        <BreadCrumbs
          breadCrumbLinks={this.state.pageLinks}
        />
        <div className="section">
          <div className="container">
            <div className="innerSection">
              <div className="tabbed-header">
                <ul className="tb">
                  <li
                    className="tabbednav active"
                  >
                    <button
                      name="NewBook"
                      onClick={this.handleClick}
                    >
                      Add New Book
                    </button>
                  </li>
                  <li className="tabbednav">
                    <button
                      name="NewAuth"
                      onClick={this.handleClick}
                    >
                      Add New Author
                    </button>
                  </li>
                  <li className="tabbednav">
                    <button
                      name="NewCategory"
                      onClick={this.handleClick}
                    >
                      Create New Category
                    </button>
                  </li>
                  <li className="tabbednav">
                    <button
                      name="EditCategory"
                      onClick={this.handleClick}
                    >
                      Edit Category
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tabbed-content">
                <NewBookForm
                  bookImageUpload={this.props.bookImageUpload}
                  newBookRequest={this.props.newBookRequest}
                  checkAuthorsRequest={this.props.checkAuthorsRequest}
                />
                <NewAuthorForm
                  newAuthorRequest={this.props.newAuthorRequest}
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
  isAdmin: PropTypes.bool.isRequired,
  bookImageUpload: PropTypes.func.isRequired,
  newBookRequest: PropTypes.func.isRequired,
  checkAuthorsRequest: PropTypes.func.isRequired
};
StockMgtPage.contextTypes = {
  router: PropTypes.object.isRequired,
};
/**
 *
 * @param {object} state
 *
 * @returns {object} nextprops
 */
function mapStateToProps(state) {
  return {
    isAdmin: (state.auth.user.role === 'Admin'),
  };
}
export default connect(mapStateToProps,
  {
    newAuthorRequest,
    bookImageUpload,
    newBookRequest,
    checkAuthorsRequest
  })(StockMgtPage);
