<img alt="Hello Books" src="https://fidelisojeah.github.io/assets/home_books_logo.svg" width="400">

[![Build Status](https://travis-ci.org/fidelisojeah/Hello-Books.svg?branch=develop)](https://travis-ci.org/fidelisojeah/Hello-Books)
[![Coverage Status](https://coveralls.io/repos/github/fidelisojeah/Hello-Books/badge.svg?branch=feature%2F152213916%2Fapi-documentation)](https://coveralls.io/github/fidelisojeah/Hello-Books?branch=feature%2F152213916%2Fapi-documentation)
[![CircleCI](https://circleci.com/gh/fidelisojeah/Hello-Books.svg?style=svg)](https://circleci.com/gh/fidelisojeah/Hello-Books)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2dc8c75d71b130c0f0b1/test_coverage)](https://codeclimate.com/github/fidelisojeah/Hello-Books/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/2dc8c75d71b130c0f0b1/maintainability)](https://codeclimate.com/github/fidelisojeah/Hello-Books/maintainability)

*Hello Books enables the easy management of an online book library*

API documentation can be viewed [here](https://fidelishellobooks.herokuapp.com/apidocs)

## Table of Contents

* [Table of Contents](#table-of-contents)
* [Built Using](#built-using)
* [Installation and Configuration](#installation-and-configuration)
* [Running the Application](#running-the-application)
>- [Production Environment](#production-environment)
>- [Development Environment](#development-environment)
* [Configure Environment Variables](#configure-environment-variables)
* [Features](#features)
* [To Contribute](#to-contribute)
* [License](#license)

## Built Using

* [React](https://reactjs.org/)
>- [Redux](<https://redux.js.org/>)

* [Node.js](<https://nodejs.org/en/>)
>- [express](<https://expressjs.com/>)
>- [Sequelize](<https://docs.sequelizejs.com/>)
>- [Nodemailer](<https://nodemailer.com/>)

* [PostgreSQL](<https://www.postgresql.org/>)

## Installation and Configuration

Before Installation, ensure you have node.js and PostgreSQL installed on your device.

* Clone the Repository

```bash
git clone https://github.com/fidelisojeah/Hello-Books
```

* Install Dependencies

```bash
npm install
```

* Install Global Dependencies

```bash
npm install -g sequelize-cli
```

* Configure Environment Variables
>- Configure Environment Variables as specified [Here](#configure-environment-variables)

* Setup Database
>- You are required to create database schemas as well as users as specified in the config files

* Migrate Database
>- Using the ORM [Sequelize](#built-using), migrate database designs

```bash
sequelize db:migrate
```

## Running the Application

The Hello Books application can be run either from a production environment, development or testing environment.

### Production Environment

Here, most code is optimised and is difficult to debug

#### To Setup Environment

* Build files

```bash
npm run build
```

#### To Run

* Use Run command

```bash
npm run start
```

### Development Environment

Default debugging mode, uses nodemon to restart server as changes are made

#### To Run in Development Environment

* Open 2 terminal windows
>- Start the Back End Server

```bash
npm run start:dev
```

>- Start the Front End server

```bash
npm run start:front
```

#### To Run Tests

```bash
npm run test
```

## Configure Environment Variables

The following Environment variables need to be set and exported for application to function properly

* **JSONWEB_SECRET** : JWT Token which would be used to sign and verify generated tokens

* **COOKIE_SECRET_KEY** : Secret Key used to sign cookies (encryption)

* **SESSION_SECRET_KEY** : Secret key for signing sessions (has to be same as secret key)

* **COVERALLS_REPO_TOKEN** : For Test Coverage reporting (gotten from [Coveralls](<https://coveralls.io/>))

* **EMAIL_HOST** : Email service provider (for dispatching mails)

* **EMAIL_PORT** : Port used to send emails (Probably be 587, 993, 995 but could be anything)

* **EMAIL_USER** : Username used for email server

* **EMAIL_PASSWORD** : Password used to login to server

* **APP_URL** : Domain Name where app is located

While App is hosted on [Heroku](<https://fidelishellobooks.herokuapp.com>), a mock email service is used [mock email service is used](<https://ethereal.email>). Emails would not be delivered to your email address but to the ethereal.email address. You can [contact me](mailto://fidelis.ojeah@andela.com) for access to it.

## Features

The Hello Books API uses signed Json Web Tokens for authorization. [See Documentation](https://fidelishellobooks.herokuapp.com/apidocs)

Regular (Authenticated) Users to the Hello Books Library can perform the following:

* View Library of books
>- Can sort books by various categories,
>- Can sort books by rating
>- Can view books by popularity (How often they have been borrowed from the library)
>- Can sort books by time/date they were added to the library
>- Can sort books alphabetically

* Borrow books from the library

* Can view books that have been borrowed by the user
>- Can sort these books by day Borrowed
>- Can sort these books by day returned
>- Can view only unreturned books (optional)

* Can Return books back to the library

* Can sign out of the application

Authenticated Admin Users to the hello books library can perform the folllowing (in addition to the functionalities of regular users)

* Can add new authors

* Can add new books to the library
>- Can specify quantity of books to be added
>- Can specify authors of the book
>- Can specify date book was published
>- Can specify book's ISBN

* Can Create a new book Category

* Can classify books by categories

* Can remove books from categories

* Can delete Categories

* Can edit book details
>- Can reduce/increase number of books available in the library
>- Can edit book names
>- Can edit publish year of books
>- Can edit ISBN of book
>- Can edit books cover image

## To Contribute

Contributions are welcome.
Code should (as much as possible) conform to the [Airbnb](<https://github.com/airbnb/javascript>) javascript style guide.

* Make of fork of the repository
* Create a branch
* **Make Changes**
* Test chnages, build
* Make for Pull Request against Develop
>- Pull Requests against Master would likely be ignored

---

## License

MIT License
