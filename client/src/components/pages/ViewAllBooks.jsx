import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BookCard from '../common/BookCard';
import { loadAllBooks } from '../actions/loadBooks';

class ViewAllBooks extends React.Component {
  render() {
    return (
      <div className="layout--container">
        <div className="layout-header">
          <div className="container">
            <h1 className="page_header--title">

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
            </ul>
          </div>
        </nav>
        <div className="section">
          <div className="container-fluid">
            <div className="list-books">
              <div>
                All Books in Library
              </div>
              <div className="categories-sorter">

              </div>
              <ul className="book-grid">

              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ViewAllBooks;
