const {Restaurant, Dish} = require('../models/index')

class RestaurantController {
  static async getAllRestaurantData (req, res, next) {
    try {
      let data = await Restaurant.findAll({
        includes: [Dish]
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async getRestaurantById (req, res, next) {
    try {
      let id = req.params.id
      let data = await Restaurant.findOne({
        where: {
          id
        },
        includes: [Dish]
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async createRestaurant (req, res, next) {
    try {
      let obj = {
        nama : req.body.name,
        logo: req.body.logo
      }
      let newRestaurant = await Restaurant.create(obj)
      res.status(201).json(newRestaurant)
    } catch (error) {
      next(error)
    }

  }
  static async editRestaurant (req, res, next) {
    try {
      let id = req.params.id
      let obj = {
        nama : req.body.name,
        logo: req.body.logo
      }
      let updatedRestaurant = await Restaurant.update(obj, {
        where: {
          id
        }
      })
      res.status(200).json(updatedRestaurant)
    } catch (error) {
      next(error)
    }

  }
  static async deleteRestaurant (req, res, next) {
    let id = req.params.id
    let deletedRestaurant = await Restaurant.destroy({
      where: {
        id
      },
      returning: true
    })
    res.status(200).json(deletedRestaurant)
  }
}

module.exports = RestaurantController