const express = require("express")
const saveStories = require("../controllers/saveStories.ctller")
const Router = express.Router()

Router.post("/", saveStories)

module.exports = Router