module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('BookAuthors', {
      bookId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'id',
        },
      },
      authorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Authors',
          key: 'id',
        },
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
  down: queryInterface => queryInterface.dropTable('BookAuthors'),
};
