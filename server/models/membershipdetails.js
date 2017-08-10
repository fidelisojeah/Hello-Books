module.exports = (sequelize, DataTypes) => {
  const Memberships = sequelize.define('Memberships', {
    membershipName: {
      type: DataTypes.STRING,
      allowNulls: false,
    },
    maxBooks: {
      type: DataTypes.INTEGER,
      allowNulls: false,
    },
    maxExtends: DataTypes.INTEGER,
  });
  Memberships.associate = (models) => {
    Memberships.hasMany(models.UserDetails, {
      foreignKey: 'MembershipId',
      as: 'users',
    });
  };
  return Memberships;
};
