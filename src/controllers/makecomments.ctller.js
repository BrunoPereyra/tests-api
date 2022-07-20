const Comments = require("../models/comments");
const Storys = require("../models/Story");

const makeComments = async (req, ress) => {
    const { idUser } = req
    const { comments, idStory } = req.body;
    let Story
    if (idStory == undefined || comments == undefined) {
        return ress.status(404).send({ ress: "missing data" });
    }
    else if (idStory.length == 24 && typeof idStory == "string") {
        Story = await Storys.findById(idStory);
        if (!Story) {
            return ress.status(404).send({ ress: "story no existe" });
        }
    }

    if (typeof comments !== "string") {
        return ress.status(400).send({
            ress: "faild data"
        })
    }

    const Comment = new Comments({
        comment: comments,
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
