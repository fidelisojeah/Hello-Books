import React from 'react';
import PropTypes from 'prop-types';

import BookCard from './BookCard';
import Pagination from './Pagination';
import PerPage from './PerPage';
import Sorter from './Sorter';
/**
 *
 * @param {object} props
 *
 * @returns {JSX}
 */
function BookGrid(props) {
  const {
    limit,
    page,
    totalPages,
    totalBooks,
    allBooks,
    perPageFunction,
    paginationFunction,
    sortFunction,
    sort,
    title
   } = props;
  return (<div className="section">
    <div>
      <div className="list-books">
        <div className="container-fluid">
          {title}
        </div>
        <div className="categories-sorter c-row">
          <div className="c-left">
            {totalBooks} Book
                  {totalBooks > 1 && 's'}</div>
          <Sorter
            sortFunction={sortFunction}
            sortType={sort}
          />

        </div>
        <ul className="book-grid">
          {Array.isArray(allBooks) && allBooks.map(bookInfos =>
            (<BookCard
              key={bookInfos.id}
              allowEdit={props.allowEdit}
              bookName={bookInfos.bookName}
              bookID={bookInfos.id}
              synopsis={bookInfos.description}
              ratingSum={(bookInfos.RatingSum === null) ?
                'empty' :
                bookInfos.RatingSum}
              ratingCount={bookInfos.RatingCount}
              imgHref={bookInfos.bookImage}
              bookAuthors={bookInfos.Authors}
              removeFromCategory={props.removeFromCategory}
            />),
          )}
        </ul>
      </div>
    </div>
    <div className="pagination-view container">
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        paginationFunction={paginationFunction}
      />
      <PerPage
        limit={parseInt(limit, 10)}
        perPageFunction={perPageFunction}
      />
    </div>
  </div>);
}
BookGrid.defaultProps = {
  allBooks: null,
  allowEdit: false
};
BookGrid.propTypes = {
  allowEdit: PropTypes.bool,
  removeFromCategory: PropTypes.func.isRequired,
  allBooks: PropTypes.array,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPageFunction: PropTypes.func.isRequired,
  paginationFunction: PropTypes.func.isRequired,
  sortFunction: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  totalBooks: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
export default BookGrid;
