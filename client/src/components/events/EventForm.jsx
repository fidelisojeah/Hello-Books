import React from 'react';

import TextField from '../common/TextField';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
  }
  render() {
    const { title, errors, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          name="title"
          value={title}
          onChange={this.onChange}
          errorMessage={errors.title}
        />
        <button type="submit" className="button btn">Create</button>
      </form>
    );
  }
}
