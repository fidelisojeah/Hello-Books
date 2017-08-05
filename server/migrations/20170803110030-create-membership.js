module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('tblMemberships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      membershipName: {
        type: Sequelize.STRING,
      },
      maxBooks: {
        type: Sequelize.INTEGER,
      },
      maxExtends: {
        type: Sequelize.INTEGER,
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
    queryInterface.dropTable('tblMemberships'),
};
