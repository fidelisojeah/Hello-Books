import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// /books/:bookId
import Ratings from './Ratings';
import AuthorList from '../lists/AuthorList';

const BookCard = ({ bookName,
  bookID,
  synopsis,
  ratingSum,
  ratingCount,
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
    </li >
  );
};
BookCard.defaultProps = {
  ratingSum: null,
};

BookCard.propTypes = {
  bookID: PropTypes.number.isRequired,
  bookName: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  imgHref: PropTypes.string.isRequired,
  ratingCount: PropTypes.string.isRequired,
  ratingSum: PropTypes.string,
  bookAuthors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BookCard;
