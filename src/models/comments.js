const { Schema, model } = require("mongoose")

const CommentsSchema = new Schema({
    comment: String,
    likes: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    commentReplies: Array
})

const comments = model("comments", CommentsSchema)
module.exports = comments