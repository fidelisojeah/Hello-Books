module.exports = {
  'it works': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('header', 8000)
      // .expect.element('.main').to.not.be.present
      .end();
  }
};
