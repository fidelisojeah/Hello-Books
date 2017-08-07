module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('BookLendings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      booksId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Books',
          key: 'id',
        },
      },
      usernameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UserDetails',
          key: 'id',
        },
      },
      borrowDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      actualReturnDate: {
        default: null,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface =>
    queryInterface.dropTable('BookLendings'),
};
