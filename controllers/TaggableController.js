const { Op } = require("sequelize");
const {Taggable, Tag, Restaurant, Dish} = require('../models/index')
class TaggableController {

  static async createTaggabel (req, res, next) {
    try {
      const obj = {
        TagId: req.body.TagId,
        RestaurantId: req.body.RestaurantId
      }
      let data = await Taggable.findAll({
        where: {
          TagId: req.body.TagId,
          RestaurantId: req.body.RestaurantId
        }
      })
      if(data.length > 0) {
        throw({
          status: 400,
          message: 'this restaurant already have this tag'
        })
      } else {
        let newTaggable = await Taggable.create(obj)
        res.status(200).json(newTaggable)
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteTaggable (req, res, next) {
    try {
      const id = req.params.id
      let deleteTaggable = await Taggable.destroy({
        where: {
          id
        }
      })
      if(deleteTaggable === 0) {
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

module.exports = TaggableController