const Comments = require("../models/comments")
const users = require("../models/users")

const getCommentsRep = async (req, ress) => {
    const { idComment } = req.body
    const { idUser } = req

    const user = await users.findById(idUser)
    if (user == null) {
        return ress.status(404).send({ ress: "user no existe" })
    }
    try {
        var arrayComments = []
        for (let i = 0; i < idComment.length; i++) {
            let idCommentsFor = idComment[i];
            var dtComments = await Comments.findById(idCommentsFor)
                .sort({ date: -1 })
                .populate("commentReplies", {
                    _id: 0
                })
                .populate("user", {
                    _id: 0
                })

            arrayComments.push(dtComments)

        }
        ress.status(202).send({
            arrayComments
        })
    } catch (error) {
        ress.status(400).send({
            ress: "get data faild"
        })
    }
}
module.exports = getCommentsRep