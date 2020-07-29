const files = (sequelize, DataTypes) => {
  const Files = sequelize.define('files', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  })

  Files.associate = models => {
    Files.belongsTo(models.User)
  }

  return Files
}

module.exports = files
