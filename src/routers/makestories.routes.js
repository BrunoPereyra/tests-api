const express = require("express")
const makeStories = require("../controllers/makestories.ctller")
const Router = express.Router()

Router.post("/",makeStories)
module.exports = Router