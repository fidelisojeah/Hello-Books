import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


import BorrowBookModule from './BorrowBookModule';
import ViewBookInfoCard from './ViewBookInfoCard';
import EditBar from './EditBar';


import AuthorList from '../lists/AuthorList';

/**
 *
 * @param {object} props
 *
 * @returns {JSX} jsx component
 */
function MainSection(props) {
  return (
    <div className="section">
      <div className="books-container">
        <div className="innerSection">
          <div className="row">
            <div className="col-md-8 col-sm-7 col-xs-12">
              <ViewBookInfoCard
                publishYear={props.publishYear}
                bookImageURL={props.bookImageURL}
                bookTitle={props.bookTitle}
                ratingCount={props.ratingCount}
                ratingSum={props.ratingSum}
                isAdmin={props.isAdmin}
                ISBN={props.ISBN}
                editFunction={props.editFunction}
              />
              <div className="col-sm-12 visible-sm-block">
                <BorrowBookModule
                  bookQuantity={props.bookQuantity}
                  borrowBookClick={props.borrowBookClick}
                  editFunction={props.editFunction}
                  isAdmin={props.isAdmin}
                />
              </div>
              <div className="col-md-6 col-md-offset-2 col-sm-12">
                <div className="about-padding">
                  <h2 className="book-about">
                    <span className="fieldField">
                      By
                          </span>
                    <span className="bookAuthors">
                      <AuthorList
                        bookAuthors={props.authorList}
                      />
                    </span>
                  </h2>
                </div>
                <div className="component-description">
                  {props.isAdmin &&
                    <EditBar
                      element="Description"
                      editFunction={props.editFunction}
                      elementName="editDescription"
                    />
                  }
                  <div className="book-description">
                    <div className="fieldField">
                      Description:
                </div>
                  </div>
                  <div
                    className="description"
                    id="description"
                  >
                    <div
                      className="collapsible-description"
                      id="collapsible-description"
                    >
                      {props.bookDescription}
                    </div>
                    <i
                      className={
                        classnames('description-toggle',
                          {
                            '-expand':
                              (props.descriptionHeight > 205
                                &&
                                !props.expanded
                              )
                          },
                          {
                            '-collapse': (props.descriptionHeight > 205
                              && props.expanded
                            )
                          })
                      }
                      id="description-toggle"
                      role="presentation"
                      onClick={props.expandCollapseDescription}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-5 hidden-sm-block">
              <BorrowBookModule
                bookQuantity={props.bookQuantity}
                borrowBookClick={props.borrowBookClick}
                editFunction={props.editFunction}
                isAdmin={props.isAdmin}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MainSection.defaultProps = {
  authorList: []
};
MainSection.propTypes = {
  authorList: PropTypes.array,
  bookDescription: PropTypes.string.isRequired,
  bookImageURL: PropTypes.string.isRequired,
  bookQuantity: PropTypes.number.isRequired,
  bookTitle: PropTypes.string.isRequired,
  borrowBookClick: PropTypes.func.isRequired,
  descriptionHeight: PropTypes.number.isRequired,
  editFunction: PropTypes.func.isRequired,
  expandCollapseDescription: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  ISBN: PropTypes.string.isRequired,
  publishYear: PropTypes.string.isRequired,
  ratingCount: PropTypes.number.isRequired,
  ratingSum: PropTypes.string.isRequired,
};
export default MainSection;
