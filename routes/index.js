const route = require('express').Router()
const restaurantRoute = require('./RestaurantRoute')
const tagRoute = require('./TagRoute')
const dishRoute = require('./DishRoute')
const orderRoute = require('./OrderRoute')
const taggableRoute = require('./TaggableRoute')
const UserController = require('../controllers/UserControllers')

route.post('/login', UserController.login)
route.post('/register', UserController.register)
route.use('/restaurants', restaurantRoute)
route.use('/tags', tagRoute)
route.use('/dishes', dishRoute)
route.use('/orders', orderRoute )
route.use('/taggables', taggableRoute)

module.exports = route