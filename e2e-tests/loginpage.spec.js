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
      .pause(3000)
      .click('#sign-up')
      .pause(3000)
      .assert.visible('#sign-up-container .button-container button')
      .assert.hidden('#sign-in-container .button-container button')
      .end();
  },
  'Sign in Errors (username Invalid)': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('header', 8000)
      .setValue('#signInUsername', 'n')
      .setValue('#signInPassword', 'p')
      .click('#sign-in-container .button-container button')
      .pause(3000)
      .assert.visible('.form-group.has-error .error-field')
      .assert.containsText('.form-group.has-error .error-field', 'Invalid Username')
      .end();
  },
  'Sign in Errors (Password Invalid)': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('header', 8000)
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('#signInUsername', 'jane')
      .setValue('#signInPassword', 'p')
      .click('#sign-in-container .button-container button')
      .pause(3000)
      .assert.visible('.form-group.has-error .error-field')
      .assert.containsText('.form-group.has-error .error-field',
      'Invalid Password')
      .end();
  },
  'Sign in Errors (Username/Password Invalid)': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('header', 8000)
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('#signInUsername', 'jane')
      .setValue('#signInPassword', 'janeDoePassword')
      .click('#sign-in-container .button-container button')
      .pause(3000)
      .assert.visible('.login-error')
      .assert.containsText('.login-error',
      'Invalid Username')
      .end();
  },
  'Sign in Errors (Username or Password Invalid)': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('header', 8000)
      .setValue('#signInUsername', 'fidelisojeah')
      .setValue('#signInPassword', 'janeDoePassword')
      .click('#sign-in-container .button-container button')
      .pause(3000)
      .assert.visible('.login-error')
      .assert.containsText('.login-error',
      'Invalid Username or password')
      .end();
  },
  'Sign in Valid': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('header', 8000)
      .setValue('#signInUsername', 'fidelisojeah')
      .setValue('#signInPassword', 'password')
      .click('#sign-in-container .button-container button')
      .pause(2000)
      .assert.containsText('#toastr-content', 'Sign In Successful')
      .waitForElementVisible('.-home', 2000)
      .pause(2000)
      .assert.urlEquals('http://localhost:8000/')
      .end();
  },
};
