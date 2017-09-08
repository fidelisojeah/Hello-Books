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
      authorAKA: {
        type: Sequelize.STRING,
      },
      dateofBirth: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }).then(() =>
      queryInterface.sequelize.query(
        queryInterface.QueryGenerator.bulkInsertQuery('Authors', [{
          authorFirstName: 'Nil',
          authorLastName: 'Anonymous',
          authorAKA: 'Anonymous',
          dateofBirth: '1900-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
        }]))),
  down: queryInterface =>
    queryInterface.dropTable('Authors'),
};
