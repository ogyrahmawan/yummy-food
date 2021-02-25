const {Dish} = require('../models/index')

class DishController {
  static async getAllDishDataData (req, res, next) {
    try {
      let data = await Dish.findAll({
        includes: [Dish]
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async createDish (req, res, next) {
    try {
      let obj = {
        nama : req.body.name,
        price: req.body.price,
        image: req.body.image,
        RestaurantId: req.body.RestaurantId
      }
      let newDish = await Dish.create(obj)
      res.status(201).json(newDish)
    } catch (error) {
      next(error)
    }

  }
  static async editDish (req, res, next) {
    try {
      let id = req.params.id
      let obj = {
        nama : req.body.name,
        price: req.body.price,
        image: req.body.image,
        RestaurantId: req.body.RestaurantId
      }
      let updatedDish = await Dish.update(obj, {
        where: {
          id
        }
      })
      res.status(200).json(updatedDish)
    } catch (error) {
      next(error)
    }

  }
  static async deleteDish (req, res, next) {
    let id = req.params.id
    let deletedDish = await Dish.destroy({
      where: {
        id
      },
      returning: true
    })
    res.status(200).json(deletedDish)
  }
}

module.exports = DishController