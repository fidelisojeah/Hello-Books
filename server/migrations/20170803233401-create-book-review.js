module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('BookReviews', {
      bookId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'id',
        },
      },
      usernameId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'UserLogins',
          key: 'id',
        },
      },
      bookReview: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookStars: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),
  down: queryInterface =>
    queryInterface.dropTable('BookReviews'),
};
