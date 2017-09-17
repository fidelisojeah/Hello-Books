module.exports = (sequelize, DataTypes) => {
  const BookRatings = sequelize.define('BookRatings', {
    rating: {
      type: DataTypes.INTEGER,
      allowNulls: false,
    },
  });
  // relationship to other tables
  BookRatings.associate = (models) => {
    BookRatings.belongsTo(models.Books, {
      foreignKey: 'bookId',
    });
    BookRatings.belongsTo(models.UserDetails, {
      foreignKey: 'userId',
    });
  };
  return BookRatings;
};
