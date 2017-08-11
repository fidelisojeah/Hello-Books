'use strict';

module.exports = function (sequelize, DataTypes) {
  var Memberships = sequelize.define('Memberships', {
    membershipName: {
      type: DataTypes.STRING,
      allowNulls: false
    },
    maxBooks: {
      type: DataTypes.INTEGER,
      allowNulls: false
    },
    maxExtends: DataTypes.INTEGER
  });
  Memberships.associate = function (models) {
    Memberships.hasMany(models.UserDetails, {
      foreignKey: 'MembershipId',
      as: 'users'
    });
  };
  return Memberships;
};