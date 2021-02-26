const {Order, User, Restaurant, Dish} = require('../models/index')
class OrderController {
  static async getAllOrderData (req, res, next) {
    try {
      let {filter, id} = req.query
      if(!filter) {
        let data = await Order.findAll({
          include: ["User","Restaurant","Dish"],
          attributes: ['id', 'UserId', 'RestaurantId', 'DishId']
        })
        res.status(200).json(data)
      } else if(filter === 'restaurant') {
        let data = await Order.findAll({
          where: {
            RestaurantId: id
          },
          include: ["User","Restaurant","Dish"],
          attributes: ['id', 'UserId', 'RestaurantId', 'DishId']
        })
        res.status(200).json(data)
      } else if(filter === 'user') {
        let data = await Order.findAll({
          where: {
            UserId: id
          },
          include: ["User","Restaurant","Dish"],
          attributes: ['id', 'UserId', 'RestaurantId', 'DishId']
        })
        res.status(200).json(data)
      }
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
      let newOrder = await Order.create(obj, {
        include: ['User','Restaurant', 'Dish'],
        attributes: ['quantity', 'note']
      })
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
      let updatedOrder = await Order.update(obj, {
        where: {
          id
        },
        returning: true
      })
      res.status(200).json(updatedOrder[1])
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
      if(data === 0) {
        throw({
          status: 400,
          message: "data not found"
        })
      } else {
        res.status(200).json({message: 'Delete Success'})
      }
    } catch (error) {
      next(error)
    }
  }
  static async cancelOrder (req, res, next) {
    try {
      let promises = []
      //req.body.orderData ini yg dikirim array of order id 
      let data = req.body.orderData
      for(let i = 0; i < data.length; i++) {
        promises.push(await Order.destroy({
          where: {
            id: +data[i]
          }
        }))
      }
      let result = await Promise.all(promises)
      let isSuccess = result.findIndex(el => {
        return el === 0
      })
      if(isSuccess !== -1) {
        throw({
          status: 400,
          message: "data not found"
        })
      }else {
        res.status(200).json({message: "Order Canceled"})
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = OrderController