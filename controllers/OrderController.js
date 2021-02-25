const {Order, User, Restaurant, Dish} = require('../models/index')
class OrderController {
  static async getAllOrderData (req, res, next) {
    try {
      let data = await Order.findALl({
        include: {
          model: Restaurant, User, Dish
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async getOrderByUser (req, res, next) {
    try {
      let UserId = req.params.UserId
      let data = await Order.findALl({
        where: {
          UserId
        },
        include: {
          model: Restaurant, User, Dish
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async getOrderByRestaurant (req, res, next) {
    try {
      let RestaurantId = req.params.RestaurantId
      let data = await Order.findALl({
        where: {
          RestaurantId
        },
        include: {
          model: Restaurant, User, Dish
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async createOrder (req, res, next) {
    try {
      let obj = {
        UserId: req.body.UserId,
        RestaurantId: req.body.RestaurantId,
        DishId: req.body.DishId,
        quantity: req.body.quantity,
        note: req.body.note ? req.body.note : ''
      }
      let newOrder = Order.create(obj)
      res.status(200).json(newOrder)
    } catch (error) {
      next(error)
    }
  }
  static async editOrder (req, res, next) {
    try {
      let id = req.params.id
      let obj = {
        UserId: req.body.UserId,
        RestaurantId: req.body.RestaurantId,
        DishId: req.body.DishId,
        quantity: req.body.quantity,
        note: req.body.note ? req.body.note : ''
      }
      let updatedOrder = Order.update(obj, {
        where: {
          id
        }
      })
      res.status(200).json(updatedOrder)
    } catch (error) {
      next(error)
    }
  }
  static async deleteDishInOrder (req, res, next) {
    try {
      let id = req.params.id
      let data = await Order.destroy({
        where: {
          id
        },
      })
      res.status(200).json({message: 'Delete Success'})
    } catch (error) {
      next(error)
    }
  }
  static async cancelOrder (req, res, next) {
    try {
      let promises = []
      let data = req.body.orderData
      for(let i = 0; i < data.length; i++) {
        promises.push(await Order.destroy({
          where: {
            id: data[i].id
          }
        }))
      }
      let result = Promise.all(promises)
      res.status(200).json({message: "Order Canceled"})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = OrderController