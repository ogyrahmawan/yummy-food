'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dish.belongsTo(models.Restaurant)
      Dish.belongsToMany(models.User, {
        through: models.Order
      })
      Dish.belongsToMany(models.Restaurant, {
        through: models.Order
      })
    }
  };
  Dish.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dish',
  });
  return Dish;
};