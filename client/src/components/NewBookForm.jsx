import React from 'react';
// import PropTypes from 'prop-types';

import TextField from './common/TextField';


class NewBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname: '',
      ISBN: '',
      publishyear: '',
      description: '',
      errors: {},
      isLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
  }
  render() {
    const { errors } = this.state;
    return (
      <div id="NewBook" className="tabs-item">
        <div className="tabs-item-content">
          <h2 className="tabs-title">
            New <span>
              Book...
              </span>
          </h2>
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  inputError={errors.inputError}
                  errorMessage={errors.message}
                  label="Book Title..."
                  onChange={this.onChange}
                  field="bookname"
                  value={this.state.bookname}
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
                  label="ISBN"
                  onChange={this.onChange}
                  field="ISBN"
                  value={this.state.ISBN}
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
                  label="Publish Year..."
                  onChange={this.onChange}
                  field="publishyear"
                  value={this.state.publishyear}
                  formField="form-group"
                  isRequired
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <textarea
                    name="description"
                    required
                    onChange={this.onChange}
                  />
                  <label htmlFor="textarea" className="control-label">
                    Description
                  </label>
                  <i className="bar" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group"
                >
                  Upload Image
                    <input
                    type="file"
                    required
                    name="image"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="button-container">
                  <button
                    disabled={this.state.isLoading ||
                      this.state.invalid}
                    className="button btn">
                    <span>Add Book</span>
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
export default NewBookForm;
