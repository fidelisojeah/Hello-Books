import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import {
  todayDate
} from './common/calculateMoment';

import TextField from './common/TextField';


class NewAuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      authorAKA: '',
      authorDOB: null,
      maxDate: todayDate(),
      errors: {},
      isLoading: false,
      invalid: false
    };
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.error) {
      if (error.data.message === 'Not allowed') {
        this.context.router.history.push('/Books');
      } else if (error.data.message === 'Unauthenticated') {
        this.context.router.history.push('/signin');
      }
      return this.setState({ isLoading: false });
    }
    this.setState({
      firstname: '',
      lastname: '',
      authorAKA: '',
      isLoading: false,
      authorDOB: null,
      error: nextprops.error
    });
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this
      .props
      .newAuthorRequest(this.state);
  }
  handleDateChange = (date) => {
    this.setState({
      authorDOB: date
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div id="NewAuth" className="tabs-item">
        <div className="tabs-item-content">
          <h2 className="tabs-title">
            New<span>
              author...
              </span>
          </h2>
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  inputError={errors.inputError}
                  errorMessage={errors.message}
                  label="Author Firstname"
                  onChange={this.onChange}
                  field="firstname"
                  value={this.state.firstname}
                  formField="form-group"
                  isRequired
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  inputError={errors.inputError}
                  errorMessage={errors.message}
                  label="Author Lastname"
                  onChange={this.onChange}
                  field="lastname"
                  value={this.state.lastname}
                  formField="form-group"
                  isRequired
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  inputError={errors.inputError}
                  errorMessage={errors.message}
                  label="Known as..."
                  onChange={this.onChange}
                  field="authorAKA"
                  isRequired={false}
                  value={this.state.authorAKA}
                  formField="form-group"
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="datepicker-span">
                  Date of Birth
                  </div>
                <DatePicker
                  selected={this.state.authorDOB}
                  inline
                  maxDate={this.state.maxDate}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  dateFormat="DD MMMM YYYY"
                  onChange={this.handleDateChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="button-container">
                  <button
                    disabled={this.state.isLoading ||
                      this.state.invalid}
                    className="button btn">
                    <span>Create Author</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
NewAuthorForm.propTypes = {
  newAuthorRequest: PropTypes.func.isRequired
};
NewAuthorForm.contextTypes = {
  router: PropTypes.object.isRequired,
};
/**
 *
 * @param {object} state
 *
 * @returns {object} nextprops
 */
function mapStateToProps(state) {
  return {
    authorCreated: state.authorReducer.authorCreated,
    authorCreateError: state.authorReducer.error
  };
}
export default connect(mapStateToProps, null)(NewAuthorForm);
