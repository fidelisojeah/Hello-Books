import React from 'react';
import PropTypes from 'prop-types';

const Sorter = ({ sortFunction, sortType }) => {
  return (
    <div className="c-right">
      <a
        href=""
        onClick={event => sortFunction(event, 'newest')}
        className={sortType === 'newest' &&
          '-active'
        }
      >
        Newest
                    </a>
      <a
        href=""
        onClick={event => sortFunction(event, 'rating')}
        className={sortType === 'rating' &&
          '-active'
        }
      >
        Rating
                  </a>
      <a
        href=""
        onClick={event => sortFunction(event, 'alphabetical')}
        className={sortType === 'alphabetical' &&
          '-active'
        }
      >
        Alphabetical
                  </a>
    </div>
  );
};
Sorter.propTypes = {
  sortFunction: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired
};

export default Sorter;
