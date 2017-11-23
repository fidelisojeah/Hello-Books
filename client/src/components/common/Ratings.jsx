import React from 'react';
import PropTypes from 'prop-types';

const Ratings = ({ rateSum, ratingCount }) => {
  // calculate average ratings
  const ratingSum = parseInt(rateSum, 10);
  let avgRate;
  let halfAvg;
  let halfAvgtostr = 'nothing';
  if (!isNaN(ratingSum)) {
    avgRate = (ratingSum / (ratingCount * 10)).toFixed(2);
    halfAvg = (Math.round(avgRate * 2) / 2).toFixed(1);
    halfAvgtostr = `s${halfAvg.split('.').join('-')}`;
  }
  return (
    <div className="ratings-panel">
      <span className="review-stars">
        {ratingCount > 0 &&
          <span
            className={halfAvgtostr}
          />
        }
      </span>
      {ratingCount <= 0 && 'Not Rated'}
      {ratingCount > 0 && `Rating: ${avgRate}`}
    </div>
  );
};
Ratings.defaultProps = {
  rateSum: null,
};
Ratings.propTypes = {
  ratingCount: PropTypes.number.isRequired,
  rateSum: PropTypes.string,
};
export default Ratings;
