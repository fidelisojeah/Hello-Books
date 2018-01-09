import sequelize from 'sequelize';
import {
  Category,
  Books,
  Authors,
  BookRatings,
} from '../models';

import CheckSession from '../middleware/CheckSession';
import toTitleCase from '../helpers/toTitleCase';

class BookCategory {
  /**
   * @description method perfofms active search on database
   *
   * @param {object} request HTTP Request object
   *
   * @param {object} response HTTP response Object
   */
  static searchCategories(request, response) {
    const categoryDetails = request.query.q || null;
    if (categoryDetails !== null && categoryDetails.length >= 1) {
      Category
        .findAll({
          where: {
            categoryName: {
              $iLike: `%${categoryDetails}%`
            }
          },
          attributes: ['id', 'categoryName']
        })
        .then((foundCategories) => {
          if (!foundCategories ||
            foundCategories === null
            || foundCategories.length === 0) {
            response.status(200).json({
              status: 'None',
              message: 'No Categories',
            });
          } else {
            response.status(202).json({
              status: 'Success',
              foundCategories,
            });
          }
        })
        .catch(errorMessage =>
          response.status(500).json({
            status: 'Unsuccessful',
            error: errorMessage,
          }));
    } else {
      response.status(200).json({
        status: 'None',
        message: 'Type Category details'
      });
    }
  }
  /**
   *
   * @param {object} decoded -decoded token object
   *
   * @param {string} categoryName
   *
   * @param {number} categoryId
   *
   * @param {number} bookId
   *
   * @returns {promise} All Good on successful
   * | Incomplete Details otherwise
   */
  static validateEntries(decoded,
    categoryName,
    categoryId,
    bookId) {
    return new Promise((resolve, reject) => {
      CheckSession
        .checkAdmin(decoded)
        .then(() => {
          if (isNaN(parseInt(categoryId, 10)) ||
            categoryName === null ||
            isNaN(parseInt(bookId, 10))) {
            reject({
              errorCode: 400,
              status: 'Unsuccessful',
              message: 'Incomplete details',
            });
          } else {
            resolve('All Good');
          }
        })
        .catch((error) => {
          reject({
            message: error,
            status: 'Unsuccessful',
            errorCode: 401
          });
        });
    });
  }
  /**
 * @description method creates a new category in database
 *
 * @param {object} request HTTP Request object
 *
 * @param {object} response HTTP Response object
 */
  static newCategory(request, response) {
    const categoryName = request.body.categoryName || null;
    BookCategory
      .validateEntries(
      request.decoded,
      categoryName,
      1,
      1)
      .then(() => {
        Category// create new category
          .create({
            categoryName: toTitleCase(categoryName)
          })
          .then((createdCategory) => { // if Category creation was successful
            response.status(201).json({
              status: 'Success',
              message: 'Category Created Successfully',
              categoryId: createdCategory.id,
              categoryName: createdCategory.categoryName
            });
          })
          .catch(errorMessage =>
            response.status(400).json({
              status: 'Unsuccessful',
              message: errorMessage.errors[0].message,
              inputError: errorMessage.errors[0].path
            })
          );
      })
      .catch(error =>
        response.status(error.errorCode).json({
          status: error.status,
          message: error.message
        })
      );
  }
  /**
  * @description method adds new book to a category
  *
  * @param {object} request HTTP Request object
  *
  * @param {object} response HTTP Response object
  */
  static addBookCategory(request, response) {
    const bookId = request.body.bookId || null;
    const categoryId = request.body.categoryId || null;
    BookCategory
      .validateEntries(
      request.decoded,
      'categoryName',
      categoryId,
      bookId)
      .then(() => {
        Promise.all([
          Books.findOne({
            where: {
              id: bookId,
              isActive: true,
            }
          }),
          Category.findOne({
            where: {
              id: categoryId
            }
          })
        ])
          .then(([foundBook, foundCategory]) => {
            if (foundBook === null || foundCategory === null) {
              response.status(400).json({
                status: 'Unsuccessful',
                message: 'Invalid Book/Category'
              });
            } else {
              foundBook
                .addCategory(foundCategory)
                .then(() => {
                  response.status(200).json({
                    status: 'Success',
                    message: 'Book Added to Category Successfully'
                  });
                });
            }
          })
          .catch(errorMessage =>
            response.status(500).json({
              status: 'Unsuccessful',
              error: errorMessage,
            }));
      })
      .catch(error =>
        response.status(error.errorCode).json({
          status: error.status,
          message: error.message
        })
      );
  }
  /**
  * @description method views books by category
  *
  * @param {object} request HTTP Request object
  *
  * @param {object} response HTTP Response object
  */
  static viewByCategory(request, response) {
    const categoryId = parseInt(request.params.categoryId, 10)
      || null;
    const limit = parseInt(request.query.limit, 10) || 10;
    const page = parseInt(request.query.page, 10) || 1;

    const orderBy = request.query.sort || null;
    const orBy = [];
    if (orderBy && orderBy.toLowerCase() === 'alphabetical') {
      orBy.push(
        'bookName'
      );
    } else if (orderBy && orderBy.toLowerCase() === 'rating') {
      orBy.push(
        [sequelize
          .fn('AVG', sequelize.col('BookRatings.rating')),
          'DESC NULLS LAST'
        ]
      );
    }
    orBy.push([
      'id', 'DESC'
    ]);
    const offset = limit * (page - 1);

    if (categoryId) {
      Promise.all([
        Books
          .count({
            where: {
              isActive: true
            },
            include: [
              {
                model: Category,
                where: {
                  id: categoryId
                },
                through: { attributes: [] }
              }
            ]
          }),
        Books
          .findAll({
            where: {
              isActive: true
            },
            subQuery: false,
            offset,
            limit,
            include: [
              {
                model: Authors,
                attributes: ['id', 'authorAKA'],
                through: { attributes: [] }
              },
              {
                model: BookRatings,
                attributes: [],
              },
              {
                model: Category,
                attributes: ['id', 'categoryName'],
                where: {
                  id: categoryId
                },
                through: { attributes: [] }
              }
            ],
            group: ['Books.id',
              'Categories.categoryName',
              'Categories.id',
              'Categories->BookCategories.categoryId',
              'Categories->BookCategories.bookId',
              'Authors.id',
              'Authors->BookAuthors.authorId',
              'Authors->BookAuthors.bookId',
            ],
            attributes: ['id', 'bookName', 'bookISBN',
              'description', 'bookImage',
              'publishYear',
              [sequelize
                .fn('count', sequelize.col('BookRatings.id')),
                'RatingCount'
              ],
              [sequelize
                .fn('sum', sequelize.col('BookRatings.rating')),
                'RatingSum'
              ],
              [sequelize
                .fn('AVG', sequelize.col('BookRatings.rating')),
                'ratingAvg'
              ]
            ],
            order: orBy
          })
      ])
        .then(([totalBooksCount, bookLists]) => {
          const totalPages =
            Math.ceil(totalBooksCount / limit);

          response.status(200).json(
            (totalBooksCount) ? {
              status: 'Success',
              bookLists,
              totalBooksCount,
              totalPages
            }
              : {
                status: 'None',
                message: 'No Books in Category',
              }
          );
        })
        .catch((error) => {
          response.status(500).json({
            status: 'Unsuccessful',
            message: 'Something went wrong!',
            error
          });
        });
    } else {
      response.status(400).json({
        status: 'Unsuccessful',
        message: 'Category not Specified',
        error: 'Category not Specified',
      });
    }
  }
  /**
  * @description method View List of all Categories
  *
  * @param {object} request HTTP Request object
  *
  * @param {object} response HTTP Response object
  */
  static viewCategories(request, response) {
    Category
      .findAll({
        attributes: ['id', 'categoryName']
      })
      .then((bookCategories) => {
        response.status(202).json({
          status: 'Success',
          bookCategories
        });
      })
      .catch(error =>
        response.status(500).json({
          status: 'Unsuccessful',
          message: 'Something went wrong!',
          error
        }));
  }
  /**
   * @description method Delete Category
   *
   * @param {object} request HTTP Request object
   *
   * @param {object} response HTTP Response object
   */
  static deleteCategory(request, response) {
    const categoryId = request.body.categoryId || null;
    BookCategory
      .validateEntries(
      request.decoded,
      'categoryName',
      categoryId,
      1)
      .then(() => {
        Category// create new category
          .destroy({
            where: {
              id: categoryId
            }
          })
          .then(() => {
            response.status(200).json({
              status: 'Success',
              message: 'Category Deleted Successfully',
              deleted: categoryId
            });
          })
          .catch((error) => {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
              response.status(403).json({
                status: 'Unsuccessful',
                message:
                  'Cannot Delete Category, Remove Books From Category First'
              });
            } else {
              response.status(500).json({
                status: 'Unsuccessful',
                message: 'Something went wrong!',
                error
              });
            }
          });
      })
      .catch(error =>
        response.status(error.errorCode).json({
          status: error.status,
          message: error.message
        })
      );
  }
  /**
  * @description method Remove Book from Category
  *
  * @param {object} request HTTP Request object
  *
  * @param {object} response HTTP Response object
  */
  static deleteBookCategory(request, response) {
    const bookId = request.body.bookId || null;
    const categoryId = request.body.categoryId || null;

    BookCategory
      .validateEntries(
      request.decoded,
      'categoryName',
      categoryId,
      bookId)
      .then(() => {
        Promise.all([
          Books.findOne({
            where: {
              id: bookId,
            }
          }),
          Category.findOne({
            where: {
              id: categoryId
            }
          })
        ])
          .then(([foundBook, foundCategory]) => {
            if (foundBook === null || foundCategory === null) {
              response.status(400).json({
                status: 'Unsuccessful',
                message: 'Invalid Book/Category'
              });
            } else {
              foundBook
                .removeCategory(foundCategory)
                .then(() => {
                  response.status(200).json({
                    status: 'Success',
                    message: 'Book Removed from Category Successfully',
                    book: bookId
                  });
                });
            }
          })
          .catch(errorMessage =>
            response.status(500).json({
              status: 'Unsuccessful',
              error: errorMessage,
            }));
      })
      .catch(error =>
        response.status(error.errorCode).json({
          status: error.status,
          message: error.message
        })
      );
  }
}
export default BookCategory;
