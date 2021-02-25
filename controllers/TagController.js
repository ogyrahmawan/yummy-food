const {Tag} = require('../models/index')

class TagController {
  static async getTag (req, res, next) {
    try {
      let tag = await Tag.findAll()
      res.status(200).json(tag)
    } catch (error) {
      next(error)
    }
  }
  static async createTag(req, res, next) {
    try {
      let obj = {
        name: req.body.name
      }
      let newTag = await Tag.create(obj)
      res.status(200).json(newTag)
    } catch (error) {
      next(error) 
    }
  }
}

module.exports = TagController