module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bookISBN: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bookImage: {
        type: Sequelize.STRING,
      },
      publishYear: {
        allowNulls: false,
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
    queryInterface.dropTable('Books'),
};
