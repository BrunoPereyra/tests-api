const express = require("express")
const following = require("../controllers/following.ctller")
const Router = express.Router()

Router.post("/",following)

module.exports = Router