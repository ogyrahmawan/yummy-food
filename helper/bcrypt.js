const bcrypt = require('bcryptjs')

function hash(pass){
    console.log('test di bcrypt')
    return bcrypt.hashSync(pass, 8) 
}

function compare(pass, hashed){
    return bcrypt.compareSync(pass, hashed)

}
module.exports = {
    hash, 
    compare
}