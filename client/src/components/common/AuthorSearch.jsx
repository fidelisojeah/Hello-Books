import React from 'react';
import TextField from './TextField';

class AuthorSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: '',
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
      <TextField
        inputError={errors.inputError}
        errorMessage={errors.message}
        label="Find Authors"
        onChange={this.onChange}
        field="authorField"
        value={this.state.authors}
        formField="form-group"
        isRequired
        type="text"
      />
    );
  }
}
export default AuthorSearch;
