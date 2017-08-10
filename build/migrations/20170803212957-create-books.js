'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bookISBN: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      bookQuantity: {
        type: Sequelize.INTEGER,
        allowNulls: false,
        default: 1
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bookImage: {
        type: Sequelize.STRING
      },
      publishYear: {
        allowNulls: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('Books');
  }
};