import React from 'react';

class Logindex extends React.Component {
  render() {
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
                          <li className="carousel-card">
                            <div>
                              <a href="">
                                <div className="carousel-image">
                                  <img src="../assets/images/AngelofHope.jpg" alt="" />
                                </div>
                                <span>
                                  Book Name
                                </span>
                              </a>
                              <div className="ratings-panel">
                                <span className="review-stars">
                                  <span className="5-0" />
                                </span>
                                Ratings: 5.0
                              </div>
                            </div>
                          </li>
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
export default Logindex;
