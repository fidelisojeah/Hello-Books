import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BookCard from '../common/BookCard';
import {
  loadAllBooks,
  clearAllIndex
} from '../actions/loadBooks';
import { logout } from '../actions/login';
import {
  fetchCategoryList
} from '../actions/categoryActions';

import LoadingPage from './LoadingPage';

export class LogIndex extends React.Component {
  constructor(props) {
    super(props);
    this.timeOutClear = null;
    this.cardSize = 160;
    this.throttle('resize', 'optimizedResize');
    this.state = {
      ratedBooks: this.props.ratedBooks,
      byLendingBooks: this.props.byLendingBooks,
      slideWidths: 0,
      totalPages: 1,
      curPosRating: 1,
      curPosLending: 1,
      showSideRatingLeft: true,
      showSideRatingRight: true,
      showSideLendingLeft: true,
      showSideLendingRight: true
    };
  }

  componentDidMount() {
    this.fetchAll();
    this.props.fetchCategoryList();
    window.addEventListener('optimizedResize', this.calculateSizes);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error && nextProps.error.status === 504) {
      if (!this.timeOutClear) {
        this.timeOutClear =
          window
            .setInterval(this.refreshOnTimeOutError, 10000);
      }
    } else if (nextProps.error &&
      nextProps.error.message) {
      this.props.logout();
      this.context.router.history.push('/signin');
    } else {
      window.clearInterval(this.timeOutClear);
      this.setState({
        bookCategories: nextProps.bookCategories,
        ratedBooks: nextProps.ratedBooks,
        byLendingBooks: nextProps.byLendingBooks,
        slideWidths:
          this.calculateSlides(this.lendingCards)
      }, () =>
          this.calculateSizes()
      );
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.timeOutClear);
    this.props.clearAllIndex();
    window.removeEventListener('optimizedResize', this.calculateSizes);
  }
  getModifierValues = (
    isLeft,
    curPosLending,
    curPosRating,
    totalPages) => {
    let ratingModifier, lendingModifier;
    if (isLeft) {
      ratingModifier =
        (curPosRating > 1) ? (curPosRating - 1)
          : curPosRating;

      lendingModifier =
        (curPosLending > 1) ? (curPosLending - 1)
          : curPosLending;
    } else {
      ratingModifier =
        (curPosRating < totalPages)
          ? (curPosRating + 1) : curPosRating;

      lendingModifier = (curPosLending < totalPages)
        ? (curPosLending + 1) : curPosLending;
    }
    return {
      ratingModifier, lendingModifier
    };
  }
  calculateSlides(element) {
    return Math.round(element.clientWidth / (this.cardSize + 16));
  }
  refreshOnTimeOutError = () => {
    this.fetchAll();
  }
  throttle = (type, name, object = window) => {
    let running = false;
    const func = () => {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(() => {
        object.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    object.addEventListener(type, func);
  }
  fetchAll() {
    this.props.loadAllBooks();
  }
  updateCarouselWidth = (
    curPosLending,
    curPosRating,
    slideWidths) => {
    this.lendingCards.getElementsByTagName('ol')[0]
      .style.marginLeft =
      `${(curPosLending - 1)
      * (-1 * ((this.cardSize + 16) * slideWidths))}px`;

    this.ratingCards.getElementsByTagName('ol')[0]
      .style.marginLeft =
      `${(curPosRating - 1)
      * (-1 * ((this.cardSize + 16) * slideWidths))}px`;
  }
  calculateSizes = () => {
    let { curPosLending,
      curPosRating,
     } = this.state;
    const booksLength = this.state.ratedBooks.length;
    const slideWidths = this.calculateSlides(this.lendingCards);
    const totalPages = Math.ceil(booksLength / slideWidths);

    curPosLending = (curPosLending < totalPages) ?
      curPosLending : totalPages;
    curPosRating = (curPosRating < totalPages) ?
      curPosRating : totalPages;

    curPosLending = (curPosLending <= 0) ? 1 : curPosLending;
    curPosRating = (curPosRating <= 0) ? 1 : curPosRating;
    
    this.updateCarouselWidth(curPosLending, curPosRating, slideWidths);

    this.setState({
      slideWidths,
      totalPages,
      showSideRatingLeft:
        (booksLength > slideWidths &&
          curPosRating !== 1),
      showSideRatingRight:
        (booksLength > slideWidths
          && curPosRating !== totalPages),
      showSideLendingLeft: (booksLength > slideWidths &&
        curPosLending !== 1),
      showSideLendingRight: (booksLength > slideWidths
        && curPosLending !== totalPages),
      curPosLending,
      curPosRating
    });
  }
  slideFunctionLending = (event, element, isLeft) => {
    event.preventDefault();
    const {
      curPosLending,
      curPosRating,
      totalPages
     } = this.state;

    const {
      lendingModifier,
      ratingModifier
      } = this
        .getModifierValues(isLeft,
        curPosLending,
        curPosRating,
        totalPages);

    this.setState({
      curPosLending:
        (element === 'lending') ? lendingModifier
          : curPosLending,
      curPosRating: (element === 'rating') ? ratingModifier
        : curPosRating
    }, () =>
        this.calculateSizes()
    );
  }
  emptyFunction = (event) => {
    event.preventDefault();
    return 1;
  }
  render() {
    if (!this.state.ratedBooks) {
      return (
        <LoadingPage />
      );
    }
    return (
      <div className="layout--container -home">
        <div className="layout-header" style={{ padding: 0 }}>
          <div className="container-fluid slide-container">
            <div className="slides fade">
              {/* <img src="../assets/images/image1.jpg" alt="" /> */}
              <div className="caption-text">Slide1</div>
            </div>
            <div className="slides fade">
              {/* <img src="../assets/images/image2.jpg" alt="" /> */}
              <div className="caption-text">Slide2</div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="innerSection">
            <h1 className="page_header--title -black -top-picks">
              Top Picks
              </h1>
            <div className="top-inner--picks">
              <div className="row-carousel" >
                <div className="row-carousel-inner">
                  <div className="carousel-nav carousel-left">
                    <button
                      id="lend-left"
                      onClick={
                        event => this
                          .slideFunctionLending(event, 'lending', true)
                      }
                      className={`a-button
                       a-carousel-button ${!this.state.showSideLendingLeft ?
                          'no-show' : undefined}
                        `}
                    >
                      <span className="button-inner">
                        <i className="h-icon" />
                      </span>
                    </button>
                  </div>
                  <div className="carousel-items">
                    <div
                      ref={(element) => { this.lendingCards = element; }}
                      className="carousel-viewport"
                      id="lending-cards"
                    >
                      <ol>
                        {this.state.byLendingBooks.map(bookInfos =>
                          (<BookCard
                            key={bookInfos.id}
                            removeFromCategory={this.emptyFunction}
                            bookName={bookInfos.bookName}
                            bookID={bookInfos.id}
                            synopsis={bookInfos.description}
                            ratingSum={(bookInfos.RatingSum === null) ?
                              'empty' :
                              bookInfos.RatingSum}
                            ratingCount={bookInfos.RatingCount}
                            imgHref={bookInfos.bookImage}
                            bookAuthors={bookInfos.Authors}
                          />),
                        )}
                      </ol>
                    </div>
                  </div>
                  <div className="carousel-nav carousel-right">
                    <button
                      id="lend-right"
                      onClick={
                        event => this
                          .slideFunctionLending(event, 'lending', false)
                      }
                      className={`a-button
                       a-carousel-button ${!this.state.showSideLendingRight ?
                          'no-show' : undefined}
                        `}
                    >
                      <span className="button-inner">
                        <i className="h-icon" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section_divider" />
        <div className="section">

          <div className="innerSection">
            <h1 className="page_header--title -black -top-picks">
              Highest Rated
              </h1>
            <div className="top-inner--picks">
              <div className="row-carousel">
                <div className="row-carousel-inner">
                  <div className="carousel-nav carousel-left">
                    <button
                      id="rate-left"
                      onClick={
                        event =>
                          this
                            .slideFunctionLending(event, 'rating', true)
                      }

                      className={`a-button
                       a-carousel-button ${!this.state.showSideRatingLeft ?
                          'no-show' : undefined}
                        `}
                    >
                      <span className="button-inner">
                        <i className="h-icon" />
                      </span>
                    </button>
                  </div>
                  <div className="carousel-items">
                    <div
                      ref={(element) => { this.ratingCards = element; }}
                      className="carousel-viewport"
                      id="rating-cards"
                    >
                      <ol>
                        {this.state.ratedBooks.map(bookInfos =>
                          (<BookCard
                            key={bookInfos.id}
                            removeFromCategory={this.emptyFunction}
                            bookName={bookInfos.bookName}
                            bookID={bookInfos.id}
                            synopsis={bookInfos.description}
                            ratingSum={(bookInfos.RatingSum === null) ?
                              'empty' :
                              bookInfos.RatingSum}
                            ratingCount={bookInfos.RatingCount}
                            imgHref={bookInfos.bookImage}
                            bookAuthors={bookInfos.Authors}
                          />),
                        )}
                      </ol>
                    </div>
                  </div>
                  <div className="carousel-nav carousel-right">
                    <button
                      id="rate-right"
                      onClick={
                        event =>
                          this
                            .slideFunctionLending(event, 'rating', false)
                      }
                      className={`a-button
                       a-carousel-button ${!this.state.showSideRatingRight ?
                          'no-show' : undefined}
                        `}
                    >
                      <span className="button-inner">
                        <i className="h-icon" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section_divider" />
        <div className="section">
          {this.state.bookCategories
            &&
            <div className="container">
              <div className="innerSection">
                <h1 className="page_header--title -black -top-picks -browse">
                  Categories
              </h1>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <ul className="category-grid">
                    {this.state.bookCategories.map(bookCategories =>
                      (<li
                        key={bookCategories.id}
                      >
                        <Link
                          to={`/categories/${bookCategories.id}`}
                          href={`/categories/${bookCategories.id}`}
                        >
                          {bookCategories.categoryName}
                        </Link>
                      </li>)
                    )}
                  </ul>
                </div>
              </div>
            </div>}
        </div>
      </div>
    );
  }
}
LogIndex.defaultProps = {
  bookCategories: [],
  byLendingBooks: [],
  error: null,
  ratedBooks: []
};
LogIndex.propTypes = {
  bookCategories: PropTypes.array,
  byLendingBooks: PropTypes.array,
  clearAllIndex: PropTypes.func.isRequired,
  error: PropTypes.object,
  fetchCategoryList: PropTypes.func.isRequired,
  loadAllBooks: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  ratedBooks: PropTypes.array,
};
LogIndex.contextTypes = {
  router: PropTypes.object.isRequired
};
/**
 * @param {object} state
 *
 * @returns {object} nextprops
 */
function mapStateToProps(state) {
  return {
    bookCategories: state.bookCategoryListReducer.bookCategories,
    ratedBooks: state.homeBooksReducer.ratedBooks,
    byLendingBooks: state.homeBooksReducer.byLendingBooks,
    error: state.homeBooksReducer.error
  };
}
export default connect(mapStateToProps,
  {
    fetchCategoryList,
    loadAllBooks,
    clearAllIndex,
    logout
  }
)(LogIndex);

