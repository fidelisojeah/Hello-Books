'use strict';

module.exports = function (sequelize, DataTypes) {
  var UserDetails = sequelize.define('UserDetails', {
    firstName: {
      type: DataTypes.STRING,
      allowNulls: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNulls: false
    },
    emailAddress: {
      type: DataTypes.STRING,
      unique: true,
      allowNulls: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  });
  UserDetails.associate = function (models) {
    UserDetails.belongsToMany(models.Books, {
      as: 'bookReview',
      through: 'BookReviews',
      foreignKey: 'usernameId',
      otherKey: 'bookId'
    });
    UserDetails.belongsTo(models.Memberships, {
      foreignKey: 'MembershipId',
      as: 'membership'
    });
  };
  return UserDetails;
};