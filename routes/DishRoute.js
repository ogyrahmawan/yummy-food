const DishController = require('../controllers/DishController')

const Route = require('express').Router()

Route.get('/',DishController.getAllDishDataData)
Route.post('/',DishController.createDish)
Route.delete('/:id', DishController.deleteDish)
Route.put('/id', DishController.editDish)

module.exports = Route