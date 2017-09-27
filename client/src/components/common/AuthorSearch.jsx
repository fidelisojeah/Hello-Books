import React from 'react';
import TextField from './TextField';

class AuthorSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorField: '',
      errors: {},
      authorList: [],
      isLoading: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  handleClick(event) {
    event.preventDefault();

  }
  onBlurEvent() {
    document.getElementById('listAuthors').style.display = 'none';
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value.length >= 1) {
      document.getElementById('listAuthors').style.display = 'block';
      this
        .props
        .checkAuthorsRequest(event.target.value)
        .then((response) => {
          if (response.data.status === 'Success') {
            this.setState({
              authorList: response.data.data,
            });
          } else {
            this.setState({
              authorList: response.data.message,
            });
          }
        })
        .catch((error) => {
          this.setState({
            authorList: [],
          });
        });
    } else {
      document.getElementById('listAuthors').style.display = 'none';
      this.setState({
        authorList: [],
      });
    }
  }
  render() {
    const authorLists =
      Array.isArray(this.state.authorList) ?
        this
          .state
          .authorList.map(authors =>
            (
              <li
                key={authors.id}
              >
                <a
                  href=""
                  onClick={this.handleClick}
                >
                  {authors.authorAKA}
                  {authors.dateofBirth &&
                    <span>{authors.dateofBirth}</span>
                  }
                </a>
              </li>
            )
          )
        : (
          <li>No Authors Found</li>
        );
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
          checkExists={this.onBlurEvent}
          formField="form-group"
          isRequired
          type="text"
        />
        <ul className="author-list" id="listAuthors">
          {authorLists}
        </ul>
      </div>
    );
  }
}
export default AuthorSearch;
