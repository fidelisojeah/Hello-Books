module.exports = {
  beforeEach: (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('header', 3000)
      .setValue('#signInUsername', 'fidelis')
      .setValue('#signInPassword', 'password')
      .click('#sign-in-container .button-container button');
  },
  'admin has access to stock management page': (client) => {
    client
      .waitForElementVisible('ul', 3000)
      .url('http://localhost:8000/bookmgt')
      .assert
      .containsText('ul li.active button', 'Add New Book')
      .assert
      .containsText('ul li:nth-child(2) button', 'Add New Author')
      .assert
      .containsText('ul li:nth-child(3) button', 'Create New Category')
      .assert
      .containsText('ul li:nth-child(4) button', 'Edit Category')
      .pause(3000)
      .end();
  },
  'admin pages tabs are present': (client) => {
    client
      .waitForElementVisible('ul', 3000)
      .url('http://localhost:8000/bookmgt')
      .assert.visible('#NewBook')
      .assert.hidden('#NewAuth')
      .assert.hidden('#NewCategory')
      .assert.hidden('#EditCategory')
      .pause(3000)
      .end();
  },
  'admin pages tabs are present (New Author)':
    (client) => {
      client
        .waitForElementVisible('ul', 3000)
        .url('http://localhost:8000/bookmgt')
        .click('ul li:nth-child(2) button')
        .pause(3000)
        .assert.hidden('#NewBook')
        .assert.visible('#NewAuth')
        .assert.hidden('#NewCategory')
        .assert.hidden('#EditCategory')
        .pause(3000)
        .end();
    },
  'admin pages tabs are present (New Category)':
    (client) => {
      client
        .waitForElementVisible('ul', 3000)
        .url('http://localhost:8000/bookmgt')
        .click('ul li:nth-child(3) button')
        .pause(3000)
        .assert.hidden('#NewBook')
        .assert.hidden('#NewAuth')
        .assert.visible('#NewCategory')
        .assert.hidden('#EditCategory')
        .pause(3000)
        .end();
    },
  'admin pages tabs are present (Edit Category)':
    (client) => {
      client
        .waitForElementVisible('ul', 3000)
        .url('http://localhost:8000/bookmgt')
        .click('ul li:nth-child(4) button')
        .pause(3000)
        .assert.hidden('#NewBook')
        .assert.hidden('#NewAuth')
        .assert.hidden('#NewCategory')
        .assert.visible('#EditCategory')
        .pause(3000)
        .end();
    },
}
