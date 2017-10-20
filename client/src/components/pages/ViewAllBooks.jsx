import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BookCard from '../common/BookCard';
import { loadAllBooks } from '../actions/loadBooks';

class ViewAllBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
    };
  }
  componentDidMount() {
    this.props.loadAllBooks()
      .then((allBooks) => {
        if (allBooks.data.status === 'Success') {
          this.setState({
            allBooks: allBooks.data.data,
          });
        } else {
          console.log(allBooks.data.status);
        }
      })
      .catch((error) => {
        if (error.response.data.message === 'Unauthenticated') {
          this.context.router.history.push('/signin');
        }
      });
  }
  render() {
    return (
      <div className="layout--container">
        <div className="layout-header">
          <div className="container">
            <h1 className="page_header--title">
              Some stuff
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
                {this.state.allBooks.map(bookInfos =>
                  (<BookCard
                    key={bookInfos.id}
                    bookName={bookInfos.bookName}
                    bookID={bookInfos.id}
                    synopsis={bookInfos.description}
                    ratingSum={(bookInfos.RatingSum === null) ?
                      'empty' :
                      bookInfos.RatingSum}
                    ratingCount={bookInfos.RatingCount}
                    imgHref={bookInfos.bookImage}
                    bookAuthors={bookInfos.Authors}
                  />),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ViewAllBooks.propTypes = {
  loadAllBooks: PropTypes.func.isRequired,
};
ViewAllBooks.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(null, { loadAllBooks })(ViewAllBooks);
