module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    bookName: {
      type: DataTypes.STRING,
      allowNulls: false,
    },
    bookISBN: {
      type: DataTypes.STRING,
      allowNulls: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNulls: false,
    },
    bookImage: {
      type: DataTypes.STRING,
    },
    publishYear: {
      allowNulls: false,
      type: DataTypes.DATE,
    },
  });
  Books.associate = (models) => {
    Books.belongsToMany(models.Authors, {
      through: 'BookAuthors',
      foreignKey: 'bookId',
      otherKey: 'authorId',
    });
    Books.belongsToMany(models.UserLogin, {
      through: 'BookReviews',
      foreignKey: 'bookId',
      otherKey: 'usernameId',
    });
    Books.belongsToMany(models.Category, {
      through: 'BookCategories',
      foreignKey: 'bookId',
      otherKey: 'categoryId',
    });
    Books.belongsToMany(models.Category, {
      through: 'BookStars',
      foreignKey: 'bookId',
      otherKey: 'categoryId',
    });
  };
  return Books;
};
