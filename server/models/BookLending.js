module.exports = (sequelize, DataTypes) => {
  const BookLending = sequelize.define('BookLendings', {
    borrowDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    dueDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    actualReturnDate: {
      default: null,
      type: DataTypes.DATE,
    },
  });
  BookLending.associate = (models) => {
    BookLending.belongsTo(models.UserDetails, {
      foreignKey: 'userId',
    });
    BookLending.belongsTo(models.Books, {
      foreignKey: 'bookId',
    });
  };
  return BookLending;
};
