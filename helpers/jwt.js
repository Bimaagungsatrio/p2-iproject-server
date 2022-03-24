const jwt = require("jsonwebtoken")
const key = 'SECRET'

function generateToken(payload) {
  return jwt.sign(payload, key)
}

function decodeToken(token) {
  return jwt.verify(token, key)
}

module.exports = {
  generateToken,
  decodeToken
}