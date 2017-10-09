import React from 'react';

export default ({ match: { params: { bookId } } }) =>
  (
    <h4>Hi {bookId}</h4>
  );
