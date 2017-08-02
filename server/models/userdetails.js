module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define('UserDetails', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  }, {
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        UserDetails.belongsTo(models.UserLoginDetails, {
          foreignKey: 'usernameID',
          as: 'usrname',
        });
      },
    },
  });
  return UserDetails;
};
