const express = require("express")
const SpotifyWebApi = require("spotify-web-api-node")
const cors = require("cors")
const { ControllerRegister } = require("./controllers/register")
const { ControllerLogin } = require("./controllers/login")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post('/register', ControllerRegister.register)
app.post('/login', ControllerLogin.login)

app.listen(port, () => {
  console.log(`connect to port ${port}`)
})