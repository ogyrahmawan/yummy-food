const OrderController = require('../controllers/OrderController')

const route = require('express').Router()
route.get('/', OrderController)
route.post('/', OrderController)
route.put('/:id', OrderController)
route.delete('/:id', OrderController)
module.exports = route