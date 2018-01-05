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
    bookQuantity: {
      type: DataTypes.INTEGER,
      allowNulls: false,
      default: 1,
    },
    description: {
      type: DataTypes.TEXT,
      allowNulls: false,
    },
    bookImage: {
      type: DataTypes.STRING,
    },
    publishYear: {
      allowNulls: false,
      type: DataTypes.DATE,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
  // relationship to other tables
  Books.associate = (models) => {
    Books.belongsToMany(models.Authors, {
      through: 'BookAuthors',
      foreignKey: 'bookId',
      otherKey: 'authorId',
    });
    Books.belongsToMany(models.UserDetails, {
      as: 'bookReview',
      through: 'BookReviews',
      foreignKey: 'bookId',
      otherKey: 'usernameId',
    });
    Books.belongsToMany(models.Category, {
      through: 'BookCategories',
      foreignKey: 'bookId',
      otherKey: 'categoryId',
    });
    Books.hasMany(models.BookRatings, {
      foreignKey: 'bookId',
    });
    Books.hasMany(models.BookLendings, {
      foreignKey: 'bookId',
    });
  };
  return Books;
};
