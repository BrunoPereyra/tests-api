const Comments = require("../models/comments");
const commentReplies = require("../models/commentReplies")
const Storys = require("../models/Story");
const Users = require("../models/users")

const deletes = async (req, ress) => {
    const { idUser } = req;
    const { comments, idStory } = req.body;


    if (idStory.length == 24 && typeof idStory == "string") {

        let Story = await Storys.findById(idStory)
        if (Story.user == idUser) {

            if (Story) {
                let user = await Users.findById(idUser)
                const userD = await user.storys.indexOf(idStory)

                await user.storys.splice(userD, 1)
                await user.save()


                let Cstories = await Story.comments
                if (Cstories) {
                    for (let i = 0; i < Cstories.length; i++) {
                        const C = Cstories[i];
                        let Dcomments = await Comments.findById(C).populate("commentReplies")
                        let CRstories = []
                        if (Dcomments.commentReplies) {
                            CRstories = await Dcomments.commentReplies
                            for (let i = 0; i < CRstories.length; i++) {
                                const e = CRstories[i];
                                await commentReplies.deleteOne({ _id: e })
                            }
                        }
                        await Comments.deleteOne({ _id: C })
                    }

                }

                await Story.deleteOne({ _id: idUser });

                return ress.status(202).send({ ress: "story delete" });
            } else {

                return ress.status(404).send({ ress: "historia no existe o no autorizado" });
            }
        } else {
            return ress.status(404).send({ ress: "no autorizado" });
        }
    } else if (comments !== undefined && comments.length == 24 && typeof comments == "string") {
        let comment = await Comments.findById(idStory);
        if (!comment) {

            return ress.status(202).send({ ress: "comments no existe" });
        } else {

            return ress.status(404).send({ ress: "comentario no existe  no autorizado" });
        }
    } else {
        return ress.status(404).send({ ress: "missing data" });
    }

};
module.exports = deletes;
