<p><a href="https://fidelisojeah.github.io">
<img alt="Hello Books" src="https://fidelisojeah.github.io/assets/home_books_logo.svg" width="400">
</a></p>
<!--# Hello-Books -->
<a href='https://coveralls.io/github/fidelisojeah/Hello-Books?branch=master'><img src='https://coveralls.io/repos/github/fidelisojeah/Hello-Books/badge.svg?branch=master' alt='Coverage Status' /></a>
<!--<a href="https://travis-ci.org/fidelisojeah/Hello-Books"><img src="https://travis-ci.org/fidelisojeah/Hello-Books.svg?branch=master" alt="Build Status" /></a>-->

*Hello Books enables the easy management of an online book library*

## Prerequisites
- node v6 or newer
- postgressql
- express v4.15 or newer
- body-parser v1.17 or newer

## Installation
- Install `node` and `postgresql`
- Clone this repository
- Create database Schema (dbhellobooks)
- Create config.json file
- Run migrations on Sequelize

### For Tests
- create schema (dbhellobooks_test)
- install `mocha` and `chai` or `supertest`
- Setup Tests in test/.js
- `npm run test`

## API

### HTTP Methods Used
- POST
- PUT
- GET
- DELETE

### Sample Routes
- Signup         - POST          - /api/v3/users/signup
- Signin         - POST          - /api/v3/users/signin
- Add Author     - POST          - /api/v1/authors
- Add Books      - POST          - /api/v1/books
- View Books     - GET           - /api/v1/books
- Modify Books   - PUT           - /api/v1/books/<bookId>
- Borrow Books   - POST          - /api/v1/users/<userId>/books

#### To Sign up
```
Request{
        "username"      :       "jonedoe",
        "password"      :       "jonedoepassword",
        "email"         :       "jonedoe@example.com",
        "firstname"     :       "Jone",
        "lastname"      :       "Doe",
}
Response{
        "status"        :       "User Created",
        "data"          : {
                            "username"      :       "jonedoe",
                            "firstname"     :       "Jone",
                            "lastname"      :       "Doe",
                            "email"         :       "jonedoe@example.com",
                            "Membership"    :       "Blue" 
    }
}
```


## To contribute
- Make of fork of the repository
- Create a branch
- **Make Changes**
- Test chnages, build
- Make for Pull Request

