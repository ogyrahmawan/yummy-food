const RestaurantController = require('../controllers/RestaurantController')

const route = require('express').Router()

route.get('/', RestaurantController.getAllRestaurantData)
route.get('/:id', RestaurantController.getRestaurantById) 
route.post('/', RestaurantController.createRestaurant)
route.put('/:id', RestaurantController.editRestaurant)
route.delete('/:id', RestaurantController.deleteRestaurant)

module.exports = route