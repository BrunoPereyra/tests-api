const Comments = require("../models/comments");
const users = require("../models/users")
const commentReplies = require("../models/commentReplies");

const commentRepliesctllr = async (req, ress) => {

    const { idUser } = req
    const { comment, idComment } = req.body;
    let Comment
    if (idComment.length == 24 && typeof idComment == "string") {
        Comment = await Comments.findById(idComment);
        if (!Comment) {
            return ress.status(404).send({ ress: "comment no existe" });
        }
    }

    if (typeof comment !== "string") {
        return ress.status(400).send({
            ress: "faild data"
        })
    }
    const user = await users.findById(idUser)
    const commentReplie = new commentReplies({
        comment,
        user: {
            nameUser: user.nameUser,
            avatar: user.avatar
        }
    })
    try {
        await commentReplie.save()
        Comment.commentReplies = await Comment.commentReplies.concat(commentReplie._id)
        await Comment.save()
        ress.status(200).send({
            ress: "comments replie save"
        })
    } catch(err) {
        return ress.status(400).send("error")
    }
};
module.exports = commentRepliesctllr;
