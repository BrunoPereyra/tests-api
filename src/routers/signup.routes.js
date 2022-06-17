const express = require("express")
const Signup = require("../controllers/signup.ctller")
const Router = express.Router()


Router.post("/",Signup)
module.exports = Router