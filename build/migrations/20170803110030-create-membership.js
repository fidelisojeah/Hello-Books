'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Memberships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      membershipName: {
        type: Sequelize.STRING
      },
      maxBooks: {
        type: Sequelize.INTEGER
      },
      maxExtends: {
        type: Sequelize.INTEGER
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
      return queryInterface.sequelize.query(queryInterface.QueryGenerator.bulkInsertQuery('Memberships', [{
        id: 1,
        membershipName: 'Blue',
        maxBooks: 3,
        maxExtends: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        membershipName: 'Silver',
        maxBooks: 10,
        maxExtends: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        membershipName: 'Gold',
        maxBooks: 30,
        maxExtends: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 4,
        membershipName: 'Black',
        maxBooks: 900,
        maxExtends: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }]));
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('Memberships');
  }
};