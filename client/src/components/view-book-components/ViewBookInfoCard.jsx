import React from 'react';
import PropTypes from 'prop-types';

import Ratings from '../common/Ratings';
import { displayYear } from '../common/calculateMoment';

import EditBar from './EditBar';
/**
 * @param {object} props
 *
 * @returns {JSX}
 */
function ViewBookInfoCard(props) {
  return (
    <div className="col-md-4 col-sm-12 primary-book-header">
      <div className="book-card-holder">
        <div className="main-image-container">
          <div className="book-image-div">
            {props.isAdmin &&
              <EditBar
                element="image"
                editFunction={props.editFunction}
              />
            }
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
        <div className="mini-area">
          <div className="book-isbn">
            {props.isAdmin &&
              <EditBar
                element="ISBN"
                editFunction={props.editFunction}
                elementName="editISBN"
              />
            }
            <span>ISBN: </span>
            {props.ISBN}
          </div>
        </div>
        <div className="mini-area">
          <div className="publish-year">
            {props.isAdmin &&
              <EditBar
                element="publish year"
                editFunction={props.editFunction}
                elementName="editPublishYear"
              />
            }
            <span>Year Published: </span>
            {displayYear(props.publishYear)}

          </div>
        </div>
      </div>
    </div>
  );
}
ViewBookInfoCard.propTypes = {
  bookImageURL: PropTypes.string.isRequired,
  bookTitle: PropTypes.string.isRequired,
  editFunction: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  ISBN: PropTypes.string.isRequired,
  publishYear: PropTypes.string.isRequired,
  ratingCount: PropTypes.number.isRequired,
  ratingSum: PropTypes.string.isRequired
};
export default ViewBookInfoCard;
