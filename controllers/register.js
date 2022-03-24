const {User} = require("../models/index")

class ControllerRegister {
  static async register(req, res) {
    let {username, email, password, gender, address, numberPhone, birthDate, imgUrl} = req.body
    try {
      let newUser = await User.create({username, email, password, gender, address, numberPhone, birthDate, imgUrl})
      res.status(201).json({username, email, gender, address, numberPhone, birthDate, imgUrl})
    } catch (error) {
      if(error.name === "SequelizeValidationError"){
        error = error.errors.map((e) => {
          return e.message
        })
        res.status(400).json({message: error})
      } else if(error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({message: error.errors[0].message})
      } else {
        res.status(500).json({message: "Internal server error"})
      }
    }
  }
}

module.exports = {
  ControllerRegister
}