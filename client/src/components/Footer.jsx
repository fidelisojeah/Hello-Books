import React from 'react';

import hbfooter from '../images/h-b-bottom.svg';


class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: 0,
    };
  }
  render() {
    return (
      <div className="layout--footer">
        <footer className="footer">
          <div className="footer--inner">
            <div className="container">
              <div className="footer-copyrights">
                <div className="footer-copyrights--container">
                  <div className="row">
                    <div className=".col-sm-6 col-xs-12">
                      <div className="footer-copyrights--item">
                        <div className="footer-copyrights--logo">
                          <div dangerouslySetInnerHTML={{ __html: hbfooter }} />
                        </div>
                      </div>
                    </div>
                    <div className=".col-sm-6 col-xs-12">
                      <div className="footer-copyrights--item">
                        <p className="footer-copyrights--item_copyrights">
                          Hello Books &copy;2017. All Rights Reserved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Footer;
