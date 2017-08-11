'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Authors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorFirstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      authorLastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateofBirth: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function () {
      return queryInterface.sequelize.query(queryInterface.QueryGenerator.bulkInsertQuery('Authors', [{
        authorFirstName: 'Nil',
        authorLastName: 'Anonymous',
        dateofBirth: '1900-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      }]));
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('Authors');
  }
};