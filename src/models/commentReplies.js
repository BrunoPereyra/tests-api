const { Schema, model } = require("mongoose")

const commentRepliesSchema = new Schema({
    comment: String,
    likes: String,
    user: Object,
    date: Date,
})

const commentReplies = model("commentReplies", commentRepliesSchema)
module.exports = commentReplies