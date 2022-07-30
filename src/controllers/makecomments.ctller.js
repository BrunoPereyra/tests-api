const Comments = require("../models/comments");
const Storys = require("../models/Story");
const users = require("../models/users")

const makeComments = async (req, ress) => {
    const { idUser } = req
    const { comment, idStory } = req.body;

    const user = await users.findById(idUser)
    if (user == null) {
        return ress.status(404).send({ ress: "user no existe" })
    }

    let Story
    if (idStory == undefined || comment == undefined) {
        return ress.status(404).send({ ress: "missing data" });
    }

    else if (idStory.length == 24 && typeof idStory == "string") {
        Story = await Storys.findById(idStory);
        if (!Story) {
            return ress.status(404).send({ ress: "story no existe" });
        }
    }

    if (typeof comment !== "string") {
        return ress.status(400).send({
            ress: "faild data"
        })
    }

    const Comment = new Comments({
        comment,
        user: idUser,
        date: new Date(),
    })
    try {
        await Comment.save()
        Story.comments = await Story.comments.concat(Comment._id)
        await Story.save()
        return ress.status(200).send({
            ress: Comment
        })
    } catch {
        return ress.status(400).send("error")
    }
};
module.exports = makeComments;
