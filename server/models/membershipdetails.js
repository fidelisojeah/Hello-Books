module.exports = (sequelize, DataTypes) => {
  const tblMemberships = sequelize.define('tblMemberships', {
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
  tblMemberships.associate = (models) => {
    tblMemberships.hasMany(models.UserDetails, {
      foreignKey: 'tblMembershipId',
      as: 'users',
    });
  };
  return tblMemberships;
};
