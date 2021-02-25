'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.hasMany(models.Dish)
      Restaurant.belongsToMany(models.User, {
        through: models.Order
      })
      Restaurant.belongsToMany(models.Dish, {
        through: models.Order
      })
      Restaurant.belongsToMany(models.Tag, {
        through: models.Taggable
      })
      Restaurant.hasMany(models.Taggable)
    }
  };
  Restaurant.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        maxLength(value) {
          if(value.length >= 128) {
            throw new Error('max restaurant name length is 128 character')
          }
        }
      }
    },
    logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};