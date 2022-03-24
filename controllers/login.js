const { comparePassword } = require("../helpers/bcryptjs")
const { generateToken } = require("../helpers/jwt")
const {User} = require("../models/index")

class ControllerLogin {
  static async login(req, res) {
    let {email, password} = req.body
    try {
      let findEmail = await User.findOne({
        where: {
          email
        }
      })
      if(!findEmail) {
        res.status(401).json({message: "Invalid email/password"})
      } else {
        let isTruePassword = comparePassword(password, findEmail.password)
        if(!isTruePassword) {
          res.status(401).json({message: "Invalid email/password"})
        } else {
          let payload = {
            id: findEmail.id
          }
          let token = generateToken(payload)
          res.status(200).json({access_token: token})
        }
      }
    } catch (error) {
      res.status(500).json({message: "Internal server error"})
    }
  }
}

module.exports = {
  ControllerLogin
}