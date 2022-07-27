const express = require("express")
const deletes = require("../controllers/deletes.ctller")
const Router = express.Router()

Router.post("/",deletes)

module.exports = Router