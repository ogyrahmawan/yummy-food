const TaggableController = require('../controllers/TaggableController')

const route = require('express').Router()

route.post('/', TaggableController.createTaggabel)
route.delete('/:id', TaggableController.deleteTaggable)

module.exports = route