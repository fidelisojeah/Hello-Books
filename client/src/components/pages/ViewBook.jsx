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
      bookTitle: ''
    };
  }
  componentDidMount() {
    this.props
      .viewOneBook(this.props.match.params.bookId)
      .then((book) => {
        console.log(book, '---');
        this.setState({
          bookTitle: book.data.data.bookName,
          bookImageURL: book.data.data.bookImage
        });
      })
      .catch((error) => {
        if (error.response.data.message === 'Unauthenticated') {
          this.context.router.history.push('/signin');
        }
      }
      );
    // this.props.match.params.bookId
  }
  render() {
    return (
      <div className="layout--container">
        <div className="layout-header">
          <div className="container"><h1 className="page_header--title">
            {this.state.bookTitle}
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
                  <img
                    src={this.state.bookImageURL}
                    alt={this.state.bookTitle}
                    className="bkimg"
                  />
                </div>
                <div className="col-sm-6 col-md-offset-2">
                  <div className="row">
                    <div className="col-xs-3 bkAuthor fieldField">
                      Authors:
                    </div>
                    <div className="col-xs-8 bookAuthors">
                      Author Names here!!!
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-3 fieldField">
                      Description:
                    </div>
                  </div>
                  <div className="row description">
                    <div className="col-xs-12">
                      Some book description here and shit
                    </div>
                  </div>
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
