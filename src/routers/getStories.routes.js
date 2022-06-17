const express = require("express")
const getStories = require("../controllers/getStories.ctller")
const Router = express.Router()

Router.get("/", getStories)
module.exports = Router
