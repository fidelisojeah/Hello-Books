module.exports = {
  'Signin/SignUp Page': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('header', 8000)
      .assert.title('Hello-Books')
      .assert.visible('button#sign-in')
      .assert.visible('#sign-up')
      .assert.containsText('#sign-in', 'Sign In')
      .assert.containsText('#sign-up', 'Sign Up')
      .assert.visible('#sign-in-container .button-container button')
      .assert.hidden('#sign-up-container .button-container button')
      .click('#sign-up')
      .assert.visible('#sign-up-container .button-container button')
      .assert.hidden('#sign-in-container .button-container button')
      .end();
  },
  'Sign in Errors': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('header', 8000)
      .click('#sign-in-container .button-container button')

      // .click('#sign-up')
      // .assert.visible('#sign-up-container .button-container button')
      // .assert.hidden('#sign-in-container .button-container button')
      .end();
  }
};
