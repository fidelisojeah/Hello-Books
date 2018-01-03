module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('BookLendings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Books',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'UserDetails',
          key: 'id',
        },
      },
      borrowDate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
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
