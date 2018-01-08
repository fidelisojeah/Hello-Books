export default {
  singleBookReducer: {
    fetching: false,
    fetched: true,
    error: null,
    fetchedBook: {
      id: 1,
      bookName: 'Sample Book',
      bookISBN: '09-293912-190-1',
      description: 'some random description',
      bookImage: 'xyz.jpg',
      publishYear: '2017-01-01T00:00:00.000Z',
      bookQuantity: 4,
      RatingCount: '3',
      RatingSum: '150',
      Authors: [{
        id: 1,
        authorFirstName: 'Jane',
        authorLastName: 'Doe',
        authorAKA: 'Jane Doe',
        dateofBirth: '1900-01-01'
      }]
    }
  },
  bookCategoryListReducer: {
    bookCategories: [
      {
        id: 1,
        categoryName: 'Adventure'
      },
      {
        id: 2,
        categoryName: 'Drama'
      },
      {
        id: 3,
        categoryName: 'History'
      }
    ]
  },
  userActionReducer: {
    message: {

    },
    error: {

    }
  },
  bookReducer: {
    fetching: false,
    fetched: true,
    fetchedBooks: {
      totalBooksCount: 2,
      totalPages: 1,
      bookLists: [
        {
          id: 1,
          bookName: 'Sample Book',
          bookISBN: '09-293912-190-1',
          description: 'some random description',
          bookImage: 'xyz.jpg',
          publishYear: '2017-01-01T00:00:00.000Z',
          bookQuantity: 4,
          RatingCount: '3',
          RatingSum: '150',
          Authors: [{
            id: 1,
            authorFirstName: 'Jane',
            authorLastName: 'Doe',
            authorAKA: 'Jane Doe',
            dateofBirth: '1900-01-01'
          }]
        },
        {
          id: 2,
          bookName: 'Sample Book 2',
          bookISBN: '09-2939-1022',
          description: 'some random description bout the second book',
          bookImage: 'xyz.jpg',
          publishYear: '2017-01-01T00:00:00.000Z',
          bookQuantity: 2,
          RatingCount: '0',
          RatingSum: null,
          Authors: [{
            id: 1,
            authorFirstName: 'Jane',
            authorLastName: 'Doe',
            authorAKA: 'Jane Doe',
            dateofBirth: '1900-01-01'
          }]
        }
      ]
    }
  },
  bookHistoryReducer: {
    availableBorrow: 3,
    membershipName: '',
    unreturnedBookCount: 0,
    borrowedBooks: [],
    borrowedBooksCount: 0,
    error: null
  },
  borrowHistoryReducer: {
    loading: false,
    loaded: false,
    fetchedBooks: [],
    totalPages: 1,
    error: null
  },
  auth: {
    isAuthenticated: true,
    user: {
      userId: 1,
      username: 'janedoe',
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'User',
      iat: 1514906580,
      exp: 1515252180
    }
  },
  homeBooksReducer: {
    ratedBooks: [
      {
        id: 2,
        bookName: 'A Random Book ',
        bookISBN: '0-20384-1391-149',
        description: 'A very random book just for testing',
        bookImage: 'xyz.jpg',
        publishYear: '1999-01-01T00:00:00.000Z',
        RatingCount: '3',
        RatingSum: '130',
        RatingAvg: '43.3333333333333333',
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 1,
        bookName: 'Harry Porter and the Philosophers Stone',
        bookISBN: '1-203-19392-13',
        description: 'This is a new description hehe',
        bookImage: 'xyz.jpg',
        publishYear: '2001-01-01T00:00:00.000Z',
        RatingCount: '3',
        RatingSum: '120',
        RatingAvg: '40.0000000000000000',
        Authors: [
          {
            id: 2,
            authorAKA: 'J.K Rowling'
          }
        ]
      },
      {
        id: 4,
        bookName: 'Oathbringer',
        bookISBN: '978-0-7653-2637-9',
        description: 'In Oathbringer,',
        bookImage: 'xyz.jpg',
        publishYear: '2017-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        Authors: [
          {
            id: 3,
            authorAKA: 'Brandon Sanderson'
          }
        ]
      },
      {
        id: 5,
        bookName: 'A random Book',
        bookISBN: '10-2093-131881-11',
        description: 'A random book by random people',
        bookImage: 'xyz.jpg',
        publishYear: '2001-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 6,
        bookName: 'Sample Book',
        bookISBN: '1029-1820-1381-11',
        description: 'This is a new description hehe',
        bookImage: 'xyz.jpg',
        publishYear: '2017-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 7,
        bookName: 'Some other Book',
        bookISBN: '109-192-139810',
        description: 'Just some random book flying around though',
        bookImage: 'xyz.jpg',
        publishYear: '1992-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 9,
        bookName: 'a third book',
        bookISBN: '1092-19181--118',
        description: 'Just a third random book mahn',
        bookImage: 'xyz.jpg',
        publishYear: '1994-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 10,
        bookName: 'A Newer book',
        bookISBN: '10-2091-191-1020',
        description: 'A much newer book maybe',
        bookImage: 'xyz.jpg',
        publishYear: '1994-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 3,
        bookName: 'Another Random Book',
        bookISBN: '0-1203-4291-31431',
        description: 'Another random book for testing stuff',
        bookImage: 'xyz.jpg',
        publishYear: '2008-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      }
    ],
    byLendingBooks: [
      {
        id: 4,
        bookName: 'Oathbringer',
        bookISBN: '978-0-7653-2637-9',
        description: 'In Oathbringer, ',
        bookImage: 'xyz.jpg',
        publishYear: '2017-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        LendingCount: '15',
        Authors: [
          {
            id: 3,
            authorAKA: 'Brandon Sanderson'
          }
        ]
      },
      {
        id: 3,
        bookName: 'Another Random Book',
        bookISBN: '0-1203-4291-31431',
        description: 'Another random book for testing stuff',
        bookImage: 'xyz.jpg',
        publishYear: '2008-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        LendingCount: '12',
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 1,
        bookName: 'Harry Porter and the Philosophers Stone',
        bookISBN: '1-203-19392-13',
        description: 'This is a new description hehe',
        bookImage: 'xyz.jpg',
        publishYear: '2001-01-01T00:00:00.000Z',
        RatingCount: '12',
        RatingSum: '480',
        RatingAvg: '40.0000000000000000',
        LendingCount: '12',
        Authors: [
          {
            id: 2,
            authorAKA: 'J.K Rowling'
          }
        ]
      },
      {
        id: 6,
        bookName: 'Sample Book',
        bookISBN: '1029-1820-1381-11',
        description: 'This is a new description hehe',
        bookImage: 'xyz.jpg',
        publishYear: '2017-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        LendingCount: '7',
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 7,
        bookName: 'Some other Book',
        bookISBN: '109-192-139810',
        description: 'Just some random book flying around though',
        bookImage: 'xyz.jpg',
        publishYear: '1992-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        LendingCount: '7',
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 5,
        bookName: 'A random Book',
        bookISBN: '10-2093-131881-11',
        description: 'A random book by random people',
        bookImage: 'xyz.jpg',
        publishYear: '2001-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        LendingCount: '3',
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 2,
        bookName: 'A Random Book ',
        bookISBN: '0-20384-1391-149',
        description: 'A very random book just for testing',
        bookImage: 'xyz.jpg',
        publishYear: '1999-01-01T00:00:00.000Z',
        RatingCount: '3',
        RatingSum: '130',
        RatingAvg: '43.3333333333333333',
        LendingCount: '3',
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 9,
        bookName: 'a third book',
        bookISBN: '1092-19181--118',
        description: 'Just a third random book mahn',
        bookImage: 'xyz.jpg',
        publishYear: '1994-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        LendingCount: '0',
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      },
      {
        id: 10,
        bookName: 'A Newer book',
        bookISBN: '10-2091-191-1020',
        description: 'A much newer book maybe',
        bookImage: 'xyz.jpg',
        publishYear: '1994-01-01T00:00:00.000Z',
        RatingCount: '0',
        RatingSum: null,
        RatingAvg: null,
        LendingCount: '0',
        Authors: [
          {
            id: 1,
            authorAKA: 'Anonymous'
          }
        ]
      }
    ],
    fetching: false,
    fetched: true,
    error: null
  },
};
