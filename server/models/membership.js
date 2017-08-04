module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define('Membership', {
    membershipName: DataTypes.STRING,
    maxBooks: DataTypes.INTEGER,
    maxExtends: DataTypes.INTEGER,
  });
  Membership.associate = (models) => {
    Membership.hasMany(models.UserDetails, {
      foreignKey: 'membershipId',
      as: 'UserDetails',
    });
  };
  return Membership;
};
