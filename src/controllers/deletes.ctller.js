const Comments = require("../models/comments");
const Storys = require("../models/Story");
const Users = require("../models/users")

const deletes = async (req, ress) => {
    const { idUser } = req;
    const { comments, idStory } = req.body;

    if (idStory.length == 24 && typeof idStory == "string") {
        let Story = await Storys.findById(idStory);
        // console.log(Story);
        if (Story) {

            let user = await Users.findById(idUser)
            const userD = await user.storys.indexOf(idStory)
            // await user.storys.splice(userD, 1)
            // await user.save()

            let Cstories = await Storys.find({user:idUser})
            let commentRep = await Cstories.id
            console.log(Cstories);
            // await Comments.findById(idUser).deleteOne({})


            // await Story.deleteOne({ _id: idUser });
            // Story.save()

            return ress.status(202).send({ ress: "story delete" });
        } else {

            return ress.status(404).send({ ress: "historia no existe o no autorizado" });
        }
    } else if (comments.length == 24 && typeof comments == "string") {
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
