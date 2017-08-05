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
        onDelete: 'CASCADE',
        references: {
          model: 'UserLogins',
          key: 'id',
        },
      },
      borrowDate: {
        type: Sequelize.DATE,
      },
      dueDate: {
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
