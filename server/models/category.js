module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryName: {
      type: DataTypes.STRING,
      allowNulls: false,
      unique: true
    },
  },
    {
      freezeTableName: true,
    });
  Category.associate = (models) => {
    Category.belongsToMany(models.Books, {
      through: 'BookCategories',
      foreignKey: 'categoryId',
      otherKey: 'bookId',
    });
  };
  return Category;
};
