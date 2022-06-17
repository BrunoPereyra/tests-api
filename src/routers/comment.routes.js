const express = require("express")
const makeComments = require("../controllers/makecomments.ctller")
const Router = express.Router()

Router.post("/",makeComments)

module.exports = Router