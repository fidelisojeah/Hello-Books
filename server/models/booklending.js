module.exports = (sequelize, DataTypes) => {
  const BookLending = sequelize.define('BookLending', {
    borrowDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    actualReturnDate: {
      default: null,
      type: DataTypes.DATE,
    },
  });
  BookLending.associate = (models) => {
    BookLending.belongsTo(models.Books, {
      foreignKey: 'bookID',
      as: 'books',
    });
    BookLending.belongsTo(models.UserDetails, {
      foreignKey: 'usernameId',
      as: 'UserDetails',
    });
  };
  return BookLending;
};
