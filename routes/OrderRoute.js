const OrderController = require('../controllers/OrderController')

const route = require('express').Router()
route.get('/', OrderController.getAllOrderData)
route.post('/', OrderController.createOrder)
route.put('/:id', OrderController.editOrder)
route.delete('/:id', OrderController.deleteDishInOrder)
route.delete('/', OrderController.cancelOrder)
module.exports = route