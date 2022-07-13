const express = require("express")
const getStoryComments = require("../controllers/getStoryComments.ctller")
const Router = express.Router()

Router.post("/",getStoryComments)

module.exports = Router