'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   Order.hasOne(models.Cart, { foreignKey: 'id' })
      Order.belongsToMany(models.Product, {
        through: {
          model: models.Order_Detail,
          attributes: ['size', 'amount', 'price']
        }, foreignKey: 'order_id'
      });

      Order.hasMany(models.Order_Detail, {
        foreignKey: 'order_id',
        onDelete: 'CASCADE' // Cascade delete the related Order_Details when an Order is deleted
      });

      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id'
      });
      Order.belongsTo(models.Allcode, {
        foreignKey: 'status',
        targetKey: 'keyMap'
      })
    }
  }
  Order.init({
    user_id: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    status: DataTypes.STRING,
    total_money: DataTypes.STRING,
    is_paid: DataTypes.BOOLEAN,
    paidAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};