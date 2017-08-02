module.exports = (sequelize, DataTypes) => {
  const UserLoginDetails = sequelize.define('UserLoginDetails', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        UserLoginDetails.has(models.UserDetails, {
          foreignKey: 'usernameID',
          as: 'usrDetails',
        });
      },
    },
  });
  return UserLoginDetails;
};
