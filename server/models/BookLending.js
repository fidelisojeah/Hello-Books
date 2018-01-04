module.exports = (sequelize, DataTypes) => {
  const BookLending = sequelize.define('BookLendings', {
    borrowDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    dueDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
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
