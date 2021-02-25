const {Dish, Restaurant} = require('../models/index')

class DishController {
  static async getAllDishDataData (req, res, next) {
    try {
      let data = await Dish.findAll({
        include: {
          model: Restaurant
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async getRestaurantDish (req, res, next) {
    try {
      let RestaurantId = req.params.RestaurantId
      let data = await Dish.findAll({
        where: {
          RestaurantId
        },
        include: {
          model: Restaurant
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async createDish (req, res, next) {
    try {
      let obj = {
        name : req.body.name,
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
        name : req.body.name,
        price: req.body.price,
        image: req.body.image
      }
      let updatedDish = await Dish.update(obj, {
        where: {
          id
        },
        returning: true
      })
      res.status(200).json(updatedDish[1])
    } catch (error) {
      next(error)
    }

  }
  static async deleteDish (req, res, next) {
    try {
      let id = req.params.id
      let deletedDish = await Dish.destroy({
        where: {
          id
        },
        returning: true
      })
      if(deletedDish === 0) {
        throw({
          status: 400,
          message: 'data not found'
        })
      } else {
        res.status(200).json({message: 'delete successfull'})
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = DishController