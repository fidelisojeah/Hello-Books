import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthorList = ({ bookAuthors }) => {
  if (Array.isArray(bookAuthors)) {
    const numberAuthors = bookAuthors.length;
    const authors = bookAuthors.map((authorsSplit, index) => (
      <span key={authorsSplit.id}>
        <Link to={`/authors/${authorsSplit.id}`}>
          {authorsSplit.authorAKA}
        </Link>
        {index < (numberAuthors - 1) && ', '}
      </span>
    ));
    return (
      <span>
        {authors}
      </span>
    );
  }
  return (
    <span>
      None
    </span>
  );
};
AuthorList.defaultProps = {
  bookAuthors: []
};
AuthorList.propTypes = {
  bookAuthors: PropTypes.array
};
export default AuthorList;
