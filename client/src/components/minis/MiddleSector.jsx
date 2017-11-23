import React from 'react';
import PropTypes from 'prop-types';

import { getMoment, displayDate } from '../common/calculate-moment';

const MiddleSector = (props) => {
  let unreturnedCount = 0;
  const unreturnedBooks = (props.borrowList) ?
    props.borrowList.map((books) => {
      if (!books.actualReturnDate) {
        unreturnedCount += 1;
        return (
          <span
            key={books.id}
          >
            <span className="book-times-orange">
              {getMoment(books.dueDate)}
            </span>
            on
              {` ${displayDate(books.dueDate)}`}
            ,
          </span>
        );
      }
      return null;
    }) :
    null;
  return (
    <div className="section">
      <div className="container">
        {props.borrowCount > 0 &&
          <p>
            You have Borrowed this book
            <span
              className="book-times-orange"
            >
              {` ${props.borrowCount} `}
            </span>
            {props.borrowCount > 1 && 'times'}
            {props.borrowCount === 1 && 'once'}
            <span
              role="presentation"
              className="book-times-review"
              onClick={event => props.reviewFunction(event)}
            >
              Review?
            </span>
          </p>
        }
        {props.borrowCount <= 0 &&
          <p>
            You have never borrowed this book
          </p>
        }
        {props.borrowed &&
          <p>
            Most recent time Borrowed was
            <span className="book-times-orange">
              {getMoment(props.borrowed)}
            </span> on
            {` ${displayDate(props.borrowed)}`}
          </p>
        }
        {unreturnedCount > 0 &&
          <p>
            Book due for return
              {unreturnedBooks}
          </p>
        }
      </div></div>
  );
};
MiddleSector.propTypes = {
  borrowCount: PropTypes.number.isRequired,
  borrowed: PropTypes.string,
  reviewFunction: PropTypes.func.isRequired,
  borrowList: PropTypes.array.isRequired,
};
MiddleSector.defaultProps = {
  borrowed: null
};
export default MiddleSector;
