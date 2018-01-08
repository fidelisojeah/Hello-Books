module.exports = {
  beforeEach: (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('header', 3000)
      .setValue('#signInUsername', 'fidelis')
      .setValue('#signInPassword', 'password')
      .click('#sign-in-container .button-container button');
  },
  'admin add new author': (client) => {
    client
      .waitForElementVisible('ul', 3000)
      .url('http://localhost:8000/bookmgt')
      .click('ul li:nth-child(2) button')
      .waitForElementVisible('#NewAuth', 3000)
      .setValue('#firstname', 'Jane')
      .setValue('#lastname', 'Doe')
      .click('[select[class="react-datepicker__year-select"] option[value=1980]')
      .click('[select[class="react-datepicker__month-select"] option[value="June"]')

      .end();
  }
};
