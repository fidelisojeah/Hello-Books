module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryName: DataTypes.STRING,
  });
  Category.associate = (models) => {
    Category.belongsToMany(models.Books, {
      through: 'BookCategories',
      foreignKey: 'categoryId',
      otherKey: 'bookId',
    });
    Category.belongsToMany(models.Books, {
      through: 'BookStars',
      foreignKey: 'categoryId',
      otherKey: 'bookId',
    });
  };
  return Category;
};
