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
      Order.belongsTo(models.User)
      Order.belongsTo(models.Restaurant)
      Order.belongsTo(models.Dish)
    }
  };
  Order.init({
    UserId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER,
    DishId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};