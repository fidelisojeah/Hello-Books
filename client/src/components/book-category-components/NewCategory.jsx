import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '../common/TextField';

import { newCategoryRequest } from
  '../actions/categoryActions';

export class NewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      errors: {},
      isLoading: false,
    };
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.error) {
      const { error } = nextprops;
      if (error.data.message === 'Not allowed') {
        this.context.router.history.push('/Books');
      } else if (error.data.message === 'Unauthenticated') {
        this.context.router.history.push('/signin');
      }
      return this.setState({
        isLoading: false
      });
    }
    this.setState({
      categoryName: '',
      isLoading: false,
      error: nextprops.error
    });
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    const { categoryName } = this.state;
    this.props
      .newCategoryRequest({ categoryName });
  }
  render() {
    const { errors } = this.state;
    return (
      <div id="NewCategory" className="tabs-item">
        <div className="tabs-item-content">
          <h2 className="tabs-title">
            New<span>Category...</span>
          </h2>
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  inputError={errors.inputError}
                  errorMessage={errors.message}
                  field="categoryName"
                  onChange={this.onChange}
                  label="Category Name"
                  value={this.state.categoryName}
                  isRequired
                  formField="form-group"
                  type="text"
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
                    <span>Create Category</span>
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

NewCategory.propTypes = {
  newCategoryRequest: PropTypes.func.isRequired,
};
/**
 *
 * @param {object} state
 *
 * @returns {object} nextprops
 */
function mapStateToProps(state) {
  return {
    successMessage: state.categoryReducer.newMessage,
    errors: state.categoryReducer.error
  };
}
export default connect(mapStateToProps, { newCategoryRequest })(NewCategory);
