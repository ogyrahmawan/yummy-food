const { deleteTag } = require('../controllers/TagController')
const TagController = require('../controllers/TagController')

const route = require('express').Router()

route.get('/', TagController.getTag)
route.post('/', TagController.createTag)
route.delete('/:id', TagController.deleteTag)
module.exports = route