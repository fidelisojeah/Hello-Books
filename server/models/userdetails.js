module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define('UserDetails', {
    firstName: {
      type: DataTypes.STRING,
      allowNulls: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNulls: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      unique: true,
      allowNulls: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: DataTypes.STRING,
  });
  UserDetails.associate = (models) => {
    UserDetails.hasMany(models.BookLending, {
      foreignKey: 'usernameId',
      as: 'booksLent',
    });
    UserDetails.belongsToMany(models.Books, {
      through: 'BookReviews',
      foreignKey: 'usernameId',
      otherKey: 'bookId',
    });
    UserDetails.belongsTo(models.Memberships, {
      foreignKey: 'MembershipId',
      as: 'Membership',
    });
  };
  return UserDetails;
};
