import React from 'react';
import PropTypes from 'prop-types';

class YearList extends React.Component {
  constructor(props) {
    super(props);
    // this.YearListFull = this.props.
  }

}
YearList.propTypes = {
  minYear: PropTypes.number.isRequired,
  maxYear: PropTypes.number.isRequired
};
export default YearList;
