module.exports = (sequelize, DataTypes) => {
  const Authors = sequelize.define('Authors', {
    authorFirstName: DataTypes.STRING,
    authorLastName: DataTypes.STRING,
    authorAKA: DataTypes.STRING,
    dateofBirth: DataTypes.DATEONLY,
  });
  Authors.associate = (models) => {
    Authors.belongsToMany(models.Books, {
      through: 'BookAuthors',
      foreignKey: 'authorId',
      otherKey: 'bookId',
    });
  };
  return Authors;
};
