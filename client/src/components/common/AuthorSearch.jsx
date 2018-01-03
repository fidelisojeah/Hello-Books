import React from 'react';
import PropTypes from 'prop-types';

import TextField from './TextField';

/**
 *
 * @param {object} props
 *
 * @returns {JSX} div element
 */
function AuthorSearch(props) {
  const authorsDiv =
    Array.isArray(props.bookAuthorDetails) ?
      props
        .bookAuthorDetails.map((authorLists, index) =>
          (
            <li key={authorLists.id}>{authorLists.name}
              <button
                onClick={event => props.handleAuthorRemove(event, index)}
              >
                &times;
            </button>
            </li>
          )
        ) : '';
  const authorLists =
    Array.isArray(props.authorList) ?
      props
        .authorList.map((authors) => {
          if (props.bookAuthors.indexOf(authors.id) === -1) {
            return (
              <li
                key={authors.id}
              >
                <span
                  role="presentation"
                  className="author-list-span"
                  key={authors.id}
                  onMouseDown={event => props.onAuthorMouseDown(event, authors)}
                >
                  {authors.authorAKA}
                  {authors.dateofBirth &&
                    <span>{authors.dateofBirth}</span>
                  }
                </span>
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
        compoundError={props.compoundError}
        isRequired={false}
        label="Find Authors"
        onChange={props.onAuthorChange}
        field="authorField"
        value={props.authorField}
        checkExists={props.onBlurEvent}
        formField="form-group"
        type="text"
        autocomplete="off"
      />
      <input
        type="hidden"
        name="authors"
        value={props.bookAuthors.join()}
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

AuthorSearch.propTypes = {
  authorField: PropTypes.string,
  bookAuthors: PropTypes.arrayOf(PropTypes.number),
  bookAuthorDetails: PropTypes.array,
  authorList: PropTypes
    .oneOfType(
    [
      PropTypes.string,
      PropTypes.array]
    ),
  onAuthorChange: PropTypes.func.isRequired,
  onBlurEvent: PropTypes.func.isRequired,
  compoundError: PropTypes.arrayOf(PropTypes.object)
};
AuthorSearch.defaultProps = {
  authorField: '',
  authorList: [],
  bookAuthors: [],
  bookAuthorDetails: [],
  compoundError: [],
};
export default AuthorSearch;
