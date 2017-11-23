import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const BookModal = (props) => {
  if (props.availableBorrow < 1) {
    return (
      <div>
        <p>
          Your membership level does not enable you
          borrow this book at the moment
        </p>
        <p>
          You have borrowed maximum number of
          books available to you
        </p>
        <div className="row">
          <div className="col-sm-5 col-xs-12">
            <Link to="/">
              <button className="btn button">
                <span> Upgrade Membership</span>
              </button>
            </Link>
          </div>
          <div className="col-sm-2 col-xs-12 visible-sm-block">
            <p>
              --Or--
              </p>
          </div>
          <div className="col-sm-5 col-xs-12 col-sm-offset-2">
            <Link to="/">
              <button className="btn button">
                <span>
                  Return Books
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <p>
        Specify Return Date</p>
      <p>
        Book Can only be borrowed for a maximum of 60 days at a time
    </p>

      <DatePicker
        inline
        selected={props.startDate}
        minDate={moment().add(1, 'days')}
        dateFormat="DD MMMM YYYY"
        maxDate={moment().add(60, 'days')}
        placeholderText="Specify Return Day"
        onChange={props.handleDateChange}
      />
      <div className="borrow-button">
        <button
          className="button btn"
          onClick={props.handleBorrowBook}
        >
          <span> Borrow Book</span>
        </button>
      </div>
    </div>
  );
};
BookModal.propTypes = {
  availableBorrow: PropTypes.number.isRequired,
  startDate: PropTypes.object.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleBorrowBook: PropTypes.func.isRequired
};
export default BookModal;
