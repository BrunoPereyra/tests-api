const express = require("express")
const commentRepliesctllr = require("../controllers/commentReplies.ctller")
const Router = express.Router()

Router.post("/",commentRepliesctllr)

module.exports = Router