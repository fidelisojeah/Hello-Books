import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// /books/:bookId
import Ratings from './Ratings';
import AuthorList from '../lists/AuthorList';
import EditBar from '../view-book-components/EditBar';


const BookCard = ({ bookName,
  bookID,
  synopsis,
  ratingSum,
  ratingCount,
  allowEdit,
  removeFromCategory,
  imgHref,
  bookAuthors }) => {
  const rateCount = parseInt(ratingCount, 10);
  // convert to integer
  return (
    <li className="carousel-card">
      <div>
        <Link
          href={`/books/${bookID}`}
          to={`/books/${bookID}`}
        >
          <div className="carousel-image">
            <img
              src={imgHref}
              alt={bookName}
            />
          </div>
          <span className="book-title">
            {bookName}
          </span>
        </Link>
        <Ratings
          rateSum={ratingSum}
          ratingCount={rateCount}
        />
        <div className="c-row c-small-text">
          <span className="c-small-text">
            <AuthorList
              bookAuthors={bookAuthors}
            />
          </span>
        </div>
      </div>
      {allowEdit &&
        <EditBar
          element={bookID.toString()}
          editFunction={removeFromCategory}
        />
      }
    </li>
  );
};
BookCard.defaultProps = {
  ratingSum: null,
  allowEdit: false
};

BookCard.propTypes = {
  bookID: PropTypes.number.isRequired,
  bookName: PropTypes.string.isRequired,
  allowEdit: PropTypes.bool,
  synopsis: PropTypes.string.isRequired,
  imgHref: PropTypes.string.isRequired,
  ratingCount: PropTypes.string.isRequired,
  ratingSum: PropTypes.string,
  bookAuthors: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFromCategory: PropTypes.func.isRequired
};

export default BookCard;
