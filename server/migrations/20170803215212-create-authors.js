module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Authors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      authorFirstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      authorLastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dateofBirth: {
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
    queryInterface.dropTable('Authors'),
};
