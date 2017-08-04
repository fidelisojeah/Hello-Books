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
    phoneNumber: DataTypes.STRING,
  });
  UserDetails.associate = (models) => {
    UserDetails.belongsTo(models.UserLogin, {
      foreignKey: 'usernameId',
      onDelete: 'CASCADE',
    });
    UserDetails.belongsTo(models.Membership, {
      foreignKey: 'membershipId',
      onDelete: 'CASCADE',
    });
  };
  return UserDetails;
};
