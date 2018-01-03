import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../common/TextField';
import ActionButton from './ActionButton';

/**
 *
 * @param {object} props
 *
 * @returns {JSX} Modal
 */
function YearListChange(props) {
  return (
    <div
      className="edit-modal"
    >
      <TextField
        errField={props.error}
        checkExists={props.onChangeBlurEvent}
        label="Select New Publish Year"
        onChange={props.handleFieldChange}
        field="editPublishYear"
        value={props.publishYear.toString()}
        formField="form-group"
        isRequired
        type="text"
      />
      {props
        .yearListShow &&
        <div>
          <ul
            className="year-list"
            id="year-list"
          >
            {props
              .yearList.map(years => (
                <li
                  key={years}
                  role="presentation"
                  onMouseDown={event =>
                    props
                      .handleYearChangeClick(event, years)}
                >
                  <span
                    className="year-list-span"
                  >
                    {years}
                  </span>
                </li>))}
          </ul>
        </div>}
      <ActionButton
        handleEditClick={props.handleEditClick}
      />
    </div>
  );
}
YearListChange.propTypes = {
  error: PropTypes.string,
  handleEditClick: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleYearChangeClick: PropTypes.func.isRequired,
  onChangeBlurEvent: PropTypes.func.isRequired,
  publishYear: PropTypes.string.isRequired,
  yearList: PropTypes.arrayOf(PropTypes.number),
  yearListShow: PropTypes.bool.isRequired,
};
YearListChange.defaultProps = {
  error: '',
  yearList: [],
};
export default YearListChange;
