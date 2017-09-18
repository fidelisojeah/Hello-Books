import React from 'react';
import PropTypes from 'prop-types';

import Ratings from './Ratings';

const BookCard = ({ bookName,
  bookDesc,
  ratingSum,
  ratingCount,
  imgHref,
  bookAuthors }) => {
  const lent = bookAuthors.length;
  const authors = bookAuthors.map((authorsSplit, index) =>
    <span key={authorsSplit.id}>
      <a href={authorsSplit.id}>{authorsSplit.authorAKA}</a>
      {index < (lent - 1) && ', '}
    </span>
    // `<a href=${authorsSplit.id}>${authorsSplit.authorAKA}</a>,`,
  );
  return (
    <li className="carousel-card">
      <div>
        <a href="">
          <div className="carousel-image">
            {/* <img src="{imgHref}" alt="" /> */}
            <img
              src={imgHref}
              style={{ width: 97, height: 150 }}
              alt=""
            />
          </div>
          <span>
            {bookName}
          </span>
        </a>
        <Ratings
          ratingSum={ratingSum}
          ratingCount={ratingCount}
        />
        <div className="c-row c-small-text">
          <span className="c-small-text">
            {authors}
          </span>
        </div>
      </div>
    </li>
  );
};
BookCard.defaultProps = {
  ratingSum: null,
};

BookCard.propTypes = {
  bookName: PropTypes.string.isRequired,
  bookDesc: PropTypes.string.isRequired,
  imgHref: PropTypes.string.isRequired,
  ratingCount: PropTypes.number.isRequired,
  ratingSum: PropTypes.number,
  bookAuthors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BookCard;
