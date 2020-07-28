const sha256 = require('js-sha256')

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  })

  User.findByLogin = async (username, password) => {
    const hashPassword = sha256(password)
    const user = await User.findOne({
      where: { username, password: hashPassword }
    })
    return user
  }

  return User
}

module.exports = user
