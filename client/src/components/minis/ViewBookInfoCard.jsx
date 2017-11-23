import React from 'react';
import PropTypes from 'prop-types';

import Ratings from '../common/Ratings';
import { displayYear } from '../common/calculate-moment';


const ViewBookInfoCard = props => (
  <div className="col-md-4 col-sm-12 primary-book-header">
    <div className="book-card-holder">
      <div className="main-image-container">
        <div className="book-image-div">
          <img
            src={props.bookImageURL}
            alt={props.bookTitle}
            className="bkimg"
          />
        </div>
      </div>
    </div>
    <div className="book-extra-info">
      <div className="book-rating-card">
        <Ratings
          ratingCount={props.ratingCount}
          rateSum={props.ratingSum}
        />
      </div>
      <div className="book-isbn">
        <span>ISBN: </span>
        {props.ISBN}
      </div>
      <div className="publish-year">
        <span>Year Published: </span>
        {displayYear(props.publishYear)}
      </div>
    </div>
  </div>
);
ViewBookInfoCard.propTypes = {
  publishYear: PropTypes.string.isRequired,
  bookImageURL: PropTypes.string.isRequired,
  bookTitle: PropTypes.string.isRequired,
  ratingCount: PropTypes.number.isRequired,
  ratingSum: PropTypes.string.isRequired,
  ISBN: PropTypes.string.isRequired
};
export default ViewBookInfoCard;
