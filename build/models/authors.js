'use strict';

module.exports = function (sequelize, DataTypes) {
  var Authors = sequelize.define('Authors', {
    authorFirstName: DataTypes.STRING,
    authorLastName: DataTypes.STRING,
    dateofBirth: DataTypes.DATEONLY
  });
  Authors.associate = function (models) {
    Authors.belongsToMany(models.Books, {
      through: 'BookAuthors',
      foreignKey: 'authorId',
      otherKey: 'bookId'
    });
  };
  return Authors;
};