import React from 'react';
import TextField from './TextField';

class AuthorSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorField: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <TextField
          inputError={errors.inputError}
          errorMessage={errors.message}
          label="Find Authors"
          onChange={this.onChange}
          field="authorField"
          value={this.state.authorField}
          formField="form-group"
          isRequired
          type="text"
        />
        <ul className="author-list">
          <li>
            <a href="">Lurene McDaniel
            <span>1944</span>
            </a>
          </li>
          <li>
            <a href="">Kirby Larson
            <span>1954</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
export default AuthorSearch;
