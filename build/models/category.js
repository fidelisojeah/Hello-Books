'use strict';

module.exports = function (sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    categoryName: DataTypes.STRING
  });
  Category.associate = function (models) {
    Category.belongsToMany(models.Books, {
      through: 'BookCategories',
      foreignKey: 'categoryId',
      otherKey: 'bookId'
    });
    Category.belongsToMany(models.Books, {
      through: 'BookStars',
      foreignKey: 'categoryId',
      otherKey: 'bookId'
    });
  };
  return Category;
};