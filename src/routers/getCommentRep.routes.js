const express = require("express")
const Router = express.Router()
const getCommentsRep = require("../controllers/getCommentRep.ctller")

Router.post("/", getCommentsRep)

module.exports = Router