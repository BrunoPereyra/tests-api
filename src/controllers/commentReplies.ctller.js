const Comments = require("../models/comments");
const users = require("../models/users")
const commentReplies = require("../models/commentReplies");

const commentRepliesctllr = async (req, ress) => {

    const { idUser } = req
    const { comment, idComment } = req.body;
   
    if (comment !== undefined && idComment !== undefined) {
        if (idComment.length == 24 && typeof idComment == "string" && typeof comment == "string") {
            Comment = await Comments.findById(idComment);
            if (!Comment) {
                return ress.status(404).send({ ress: "comment no existe" });
            }
        } else {
            return ress.status(400).send({
                ress: "id malformado"
            })
        }
    } else {
        return ress.status(400).send({
            ress: "faild data"
        })
    }
    const user = await users.findById(idUser)
    if (!user) {
        return ress.status(400).send({
            ress: "user no existe"
        })
    }
    const commentReplie = new commentReplies({
        comment,
        date: new Date(),
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
    } catch (err) {
        return ress.status(400).send({ress:"error"})
    }
};
module.exports = commentRepliesctllr;
