const TagController = require('../controllers/TagController')

const route = require('express').Router()

route.get('/', TagController.getTag)
route.post('/', TagController.createTag)
module.exports = route