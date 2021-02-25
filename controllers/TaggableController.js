const {Taggable, Tag, Restaurant} = require('../models/index')
class TaggableController {
  static async getTaggable (req, res, next) {
    try {
      
    } catch (error) {
      
    }
  }
  static async createTaggabel (req, res, next) {
    try {
      const obj = {
        TagId: req.body.TagId,
        RestaurantId: req.body.RestaurantId
      }
      let newTaggable = await Taggable.create(obj)
      res.status(200).json(newTaggable)
    } catch (error) {
      next(error)
    }
  }
  static async editTaggable (req, res, next) {
    try {
      const id = req.params.id
      const obj = {
        TagId: req.body.TagId,
        RestaurantId: req.body.RestaurantId
      }
      let updateTaggable = await Taggable.update(obj, {
        where: {
          id
        }
      })
      res.status(200).json(updateTaggable)
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
      res.status(200).json(deleteTaggable)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TaggableController