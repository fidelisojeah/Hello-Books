import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Ratings = ({ ratingSum, ratingCount }) => {
  // calculate average ratings
  const avgRate = (ratingSum / (ratingCount * 10)).toFixed(2);
  const halfAvg = (Math.round(avgRate * 2) / 2).toFixed(1);
  const halfAvgtostr = `s${halfAvg.split('.').join('-')}`;
  return (
    <div className="ratings-panel">
      <span className="review-stars">
        <span
          className={classnames(halfAvgtostr)}
        />
      </span>
      {ratingCount <= 0 && 'Not Rated'}
      {ratingCount > 0 && `Ratings: ${avgRate}`}
    </div>
  );
};
Ratings.defaultProps = {
  ratingSum: null,
};
Ratings.propTypes = {
  ratingCount: PropTypes.number.isRequired,
  ratingSum: PropTypes.number,
};
export default Ratings;
