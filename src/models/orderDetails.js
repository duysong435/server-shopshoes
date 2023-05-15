'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   Order_Detail.hasOne(models.Cart, { foreignKey: 'id' })
      Order_Detail.belongsTo(models.Product, { foreignKey: 'product_id', targetKey: 'id', as: 'dataProduct' });
      Order_Detail.belongsTo(models.Order, {
        foreignKey: 'order_id',
        targetKey: 'id',
        onDelete: 'CASCADE',
        hooks: true
      });

    }
  }
  Order_Detail.init({
    order_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    size: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Order_Detail',
  });
  return Order_Detail;
};