const { Schema, model } = require("mongoose")

const CommentsSchema = new Schema({
    comment: String,
    likes: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    commentReplies: [{
        type: Schema.Types.ObjectId,
        ref: "commentReplies"
    }],
})

const comments = model("comments", CommentsSchema)
module.exports = comments