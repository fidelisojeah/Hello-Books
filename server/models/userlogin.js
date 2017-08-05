module.exports = (sequelize, DataTypes) => {
  const UserLogin = sequelize.define('UserLogin', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  UserLogin.associate = (models) => {
    UserLogin.hasOne(models.UserDetails, {
      foreignKey: 'usernameId',
      as: 'userDetails',
    });
    UserLogin.hasMany(models.BookLending, {
      foreignKey: 'usernameId',
      as: 'booksLent',
    });
    UserLogin.belongsToMany(models.Books, {
      through: 'BookReviews',
      foreignKey: 'usernameId',
      otherKey: 'bookId',
    });
  };
  return UserLogin;
};
