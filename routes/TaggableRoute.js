const TaggableController = require('../controllers/TaggableController')

const route = require('express').Router()

route.get('/', TaggableController.getTaggable)
route.post('/', TaggableController.createTaggabel)
route.put('/:id', TaggableController.editTaggable)
route.delete('/:id', TaggableController.deleteTaggable)

module.exports = route