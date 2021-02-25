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
  static async deleteTag(req, res, next) {
    try {
      let id = req.params.id
      let deletedTag = await Tag.destroy({
        where: {
          id
        }
      })
      if(deletedTag === 0) {
        throw({
          status: 200,
          message: 'data not found'
        })
      }
      res.status(200).json({message: 'delete success'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TagController