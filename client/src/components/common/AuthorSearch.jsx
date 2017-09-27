import React from 'react';
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
    const bookAuthors = this.state.bookAuthors;// .slice(0);
    const bookAuthorDetails = this.state.bookAuthorDetails;// .slice(0);
    bookAuthors.push(author.id);

    bookAuthorDetails.push({
      id: author.id,
      name: author.authorAKA
    });
    this.setState({
      bookAuthors,
      bookAuthorDetails
    });
    console.log(this.state.bookAuthorDetails);
  }
  render() {
    const authorLists =
      Array.isArray(this.state.authorList) ?
        this
          .state
          .authorList.map((authors) => {
            if (this.state.bookAuthors.indexOf(authors.id) === -1) {
              console.log(this.state.bookAuthors.indexOf(authors.id), '---');
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
          })
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
