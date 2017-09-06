module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      MembershipId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Memberships',
          key: 'id',
        },
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      authString: {
        type: Sequelize.STRING,
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      isActivated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      emailaddress: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      phonenumber: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }),
  down: queryInterface =>
    queryInterface.dropTable('UserDetails'),
};
