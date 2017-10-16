import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { viewOneBook } from '../actions/loadBooks';

class ViewBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookImageURL: '',
      bookAuthors: [],

    };
  }
  componentDidMount() {
    this.props
      .viewOneBook(this.props.match.params.bookId)
      .then((book) => {
        console.log(book, '---');
      })
      .catch((error) => {
        console.log(error, 'error');
      }
      );
    // this.props.match.params.bookId
  }
  render() {
    return (
      <div className="layout--container">
        <div className="layout-header">
          <div className="container"><h1 className="page_header--title">
            Book Title
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
                <a href="" className="breadcrumbs--link">Library</a>
              </li>
              <li className="breadcrumbs--item">
                <a href="" className="breadcrumbs--link -active">Book</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="section">
          <div className="container">
            <div className="innerSection">
              <div className="row">
                <div className="col-sm-4">
                  <img src="" alt="" className="bkimg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ViewBook.propTypes = {
  viewOneBook: PropTypes.func.isRequired
};
export default connect(null, { viewOneBook })(ViewBook);
