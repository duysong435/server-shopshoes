'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasOne(models.Cart, { foreignKey: 'id' })
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM('M', 'F', 'O'),
      defaultValue: 'O',
      allowNull: false
    },
    image: DataTypes.STRING,
    role_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};