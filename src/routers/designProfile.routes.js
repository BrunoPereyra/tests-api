const express = require("express")
const Router = express.Router()
const designProfile = require("../controllers/designProfile.ctller")

Router.post("/",designProfile)

module.exports = Router
