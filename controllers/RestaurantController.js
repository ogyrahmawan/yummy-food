const {Restaurant, Dish, Tag} = require('../models/index')
const {Op} = require('sequelize')
class RestaurantController {
  static async getAllRestaurantData (req, res, next) {
    try {
      let {tag} = req.query
      if(!tag) {
        let data = await Restaurant.findAll({
          include: [{
            model: Dish
          }, 
          {
            model: Tag
          }]
        })
        res.status(200).json(data)
      } else if (Array.isArray(tag)) {
        
        let data = await Restaurant.findAll({
          include: [{
            model: Dish
          },
          {
            model: Tag,
            where: {
              [Op.or]: [
                {name: tag[0]},
                {name: tag[1]}
              ]
            },
          }]
        })
        res.status(200).json(data)
      } else {
        let data = await Restaurant.findAll({
          include: [{
            model: Dish
          },
          {
            model: Tag,
            where: {
              name: tag
            }
          }]
        })
        res.status(200).json(data)
      }
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
        include: [Dish, Tag]
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async createRestaurant (req, res, next) {
    try {
      let obj = {
        name : req.body.name,
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
        name : req.body.name,
        logo: req.body.logo
      }
      let updatedRestaurant = await Restaurant.update(obj, {
        where: {
          id
        },
        returning: true
      })
      res.status(200).json(updatedRestaurant[1])
    } catch (error) {
      next(error)
    }

  }
  static async deleteRestaurant (req, res, next) {
    try {
      let id = req.params.id
      let deletedRestaurant = await Restaurant.destroy({
        where: {
          id
        }
      })
      if(deletedRestaurant === 0) {
        throw({
          status: 400,
          message: 'data not found'
        })
      }
      res.status(200).json({message: 'delete success'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = RestaurantController