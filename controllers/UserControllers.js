const {User} = require('../models/index')
const {compare} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')

class UserController {
  static async register(req, res, next) {
    try {
        let user = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        }
        let data = await User.create(user)
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
  }
  static async login(req, res, next){
    try {
      let data = await User.findOne({
          where: {
              email: req.body.email    
          },
        })
      if(!data){
          throw({
              status: 400,
              message: `Invalid Account`
          })
      } else {
          if(compare(req.body.password, data.password)){
              const access_token = generateToken({id: data.id, email: data.email, role: data.role})
              res.status(200).json({ 
                access_token, 
                email: req.body.email, 
                name: req.body.name 
              })
          }
      }
    } catch (error) {
      next(error)
    }
  }
}
module.exports = UserController