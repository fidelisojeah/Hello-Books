import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  displayDate,
  getMoment
} from '../common/calculate-moment';

/**
 * @param {object} props
 * @returns {JSX} list of borrowed Books
 */
function BorrowedBooksList(props) {
  const { borrowedList } = props;
  const checkOverdue = (dueDate, returnDate) => {
    const todayDate = new Date();
    const dateDue = new Date(dueDate);
    if (!returnDate &&
      todayDate > dateDue
    ) {
      return true;
    }
    return false;
  };
  return (
    <tbody>
      {
        Array.isArray(borrowedList) && borrowedList.map(bookInfo =>
          (
            <tr
              key={bookInfo.id}
            >
              <td>
                <Link
                  href={`/books/${bookInfo.Book.id}`}
                  to={`/books/${bookInfo.Book.id}`}
                >
                  {bookInfo.Book.bookName}
                </Link>
              </td>
              <td className="hidden-sm-table">
                {displayDate(bookInfo.borrowDate)}
              </td>
              <td
                className={
                  checkOverdue(bookInfo.dueDate,
                    bookInfo.actualReturnDate) ? 'hidden-xs-table -book-due'
                    : 'hidden-xs-table'
                }
              >
                {displayDate(bookInfo.dueDate)}
              </td>
              <td >
                {
                  bookInfo.actualReturnDate ?
                    (<span>
                      Returned {getMoment(bookInfo.actualReturnDate)}
                    </span>)
                    :
                    (<button
                      onClick={event => props
                        .returnBookFunction(event,
                        bookInfo.id,
                        bookInfo.Book.id
                        )}
                      className="button btn"
                    >
                      <span>
                        Return
                        </span>
                    </button>)
                }
              </td>

            </tr>
          )
        )
      }
    </tbody>
  );
}
BorrowedBooksList.propTypes = {
  borrowedList: PropTypes.array.isRequired
};

export default BorrowedBooksList;
