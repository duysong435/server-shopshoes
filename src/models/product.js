'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.hasMany(models.Cart, { foreignKey: 'id' })
      // Product.hasMany(Order_Detail, { foreignKey: 'product_id' });
      Product.belongsToMany(models.Order, {
        through: {
          model: models.Order_Detail,
          attributes: ['size', 'amount', 'price']
        }
        , foreignKey: 'product_id'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    brand_id: DataTypes.STRING,
    image: DataTypes.BLOB('long')
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};