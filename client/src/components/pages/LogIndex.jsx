import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BookCard from '../common/BookCard';
import { loadAllBooks } from '../actions/loadBooks';

class Logindex extends React.Component {
  componentDidMount() {
    loadAllBooks()
      .then((allBooks) => {
        if (allBooks) {
          console.log(allBooks);
        } else {
          console.log('error');
        }
      })
      .catch(error => console.log(error));
  }
  render() {
    const rateSum1 = 428;
    const rateCount1 = 10;
    const bkAuth = [
      {
        id: 1,
        authorAKA: 'Rachel Cohn',
      },
      {
        id: 2,
        authorAKA: 'Someone Else',
      }];
    return (
      <div className="layout--container">
        <div className="layout-header" style={{ padding: 0 }}>
          <div className="container-fluid slide-container">
            <div className="slides fade">
              <img src="../assets/images/image1.jpg" alt="" />
              <div className="caption-text">Slide1</div>
            </div>
            <div className="slides fade">
              <img src="../assets/images/image2.jpg" alt="" />
              <div className="caption-text">Slide2</div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="innerSection">
              <h1 className="page_header--title -black -top-picks">
                Top Picks
              </h1>
              <div className="top-inner--picks">
                <div className="row-carousel">
                  <div className="row-carousel-inner">
                    <div className="carousel-nav carousel-left">
                      <a href="" className="a-button a-carousel-button">
                        <span className="button-inner">
                          <i className="h-icon" />
                        </span>
                      </a>
                    </div>
                    <div className="carousel-items">
                      <div className="carousel-viewport">
                        <ol>
                          <BookCard
                            bookName={'Harry Porter and the Chambers of Secrets'}
                            bookDesc={'Some descriptions here'}
                            ratingSum={rateSum1}
                            ratingCount={rateCount1}
                            imgHref={'../assets/images/hattie-big-sky.jpg'}
                            bookAuthors={bkAuth}
                          />
                        </ol>
                      </div>
                    </div>
                    <div className="carousel-nav carousel-right">
                      <a href="" className="a-button a-carousel-button">
                        <span className="button-inner">
                          <i className="h-icon" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
Logindex.propTypes = {
  loadAllBooks: PropTypes.func.isRequired,
};
export default connect(null, { loadAllBooks })(Logindex);

