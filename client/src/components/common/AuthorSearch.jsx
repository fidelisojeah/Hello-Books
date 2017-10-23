import React from 'react';
import PropTypes from 'prop-types';

import TextField from './TextField';

class AuthorSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorField: '',
      errors: {},
      authorList: [],
      bookAuthors: [],
      bookAuthorDetails: [],
      isLoading: false
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onChange = this.onChange.bind(this);
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
        .catch(() => {
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
  onMouseDown = (event, author) => {
    event.preventDefault();
    const bookAuthors = this.state.bookAuthors;
    const bookAuthorDetails = this.state.bookAuthorDetails;
    bookAuthors.push(author.id);
    bookAuthorDetails.push({
      id: author.id,
      name: author.authorAKA
    });
    this.setState({
      bookAuthors,
      bookAuthorDetails,
      authorField: '',
      authorList: []
    });
    this.props.handleAuthorChange(this.state.bookAuthors.join());
  }
  handleClick = (event, position) => {
    event.preventDefault();
    const bookAuthorDetails = this.state.bookAuthorDetails;
    const bookAuthors = this.state.bookAuthors;

    bookAuthorDetails.splice(position, 1);
    bookAuthors.splice(position, 1);
    this.setState({
      bookAuthors,
      bookAuthorDetails
    });
    this.props.handleAuthorChange(this.state.bookAuthors.join());
  }
  render() {
    const authorsDiv =
      Array.isArray(this.state.bookAuthorDetails) ?
        this
          .state
          .bookAuthorDetails.map((authorLists, index) =>
            (
              <li key={authorLists.id}>{authorLists.name}
                <button
                  onClick={event => this.handleClick(event, index)}
                >
                  &times;
            </button>
              </li>
            )
          ) : '';
    const authorLists =
      Array.isArray(this.state.authorList) ?
        this
          .state
          .authorList.map((authors) => {
            if (this.state.bookAuthors.indexOf(authors.id) === -1) {
              return (
                <li
                  key={authors.id}
                >
                  <a
                    role="presentation"
                    key={authors.id}
                    onMouseDown={event => this.onMouseDown(event, authors)}
                  >
                    {authors.authorAKA}
                    {authors.dateofBirth &&
                      <span>{authors.dateofBirth}</span>
                    }
                  </a>
                </li >
              );
            }
            return null;
          })
        : (
          <li>No Authors Found</li>
        );
    return (
      <div>
        <TextField
          compoundError={this.props.compoundError}
          isRequired={false}
          label="Find Authors"
          onChange={this.onChange}
          field="authorField"
          value={this.state.authorField}
          checkExists={this.onBlurEvent}
          formField="form-group"
          type="text"
        />
        <input
          type="hidden"
          name="authors"
          value={this.state.bookAuthors.join()}
          required="required"
        />
        {authorsDiv &&
          <div className="row">

            <ul className="selected-Authors">
              {authorsDiv}
            </ul>
          </div>
        }
        <ul className="author-list" id="listAuthors">
          {authorLists}
        </ul>
      </div >
    );
  }
}
AuthorSearch.propTypes = {
  handleAuthorChange: PropTypes.func.isRequired,
  checkAuthorsRequest: PropTypes.func.isRequired,
  compoundError: PropTypes.arrayOf(PropTypes.object)
};
AuthorSearch.defaultProps = {
  compoundError: []
};
export default AuthorSearch;
