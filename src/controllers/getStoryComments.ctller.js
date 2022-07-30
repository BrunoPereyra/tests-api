const Story = require("../models/Story")
const Users = require("../models/users")

const getStoriesComments = async (req, ress) => {
    const { idStory } = req.body
    const { idUser } = req;
    
    const users = await Users.findById(idUser)
    if (users == null) {
        return ress.status(404).send({ ress: "user no existe" })
    }
    try {
        const dt = await Story.findById(idStory)
            .populate("comments")
            .populate("user", {
                nameUser: 1,
                _id: 0
            })
        ress.status(202).send({
            ress: dt
        })
    } catch (err) {
        ress.status(404).json({
            ress: "error"
        })
    }

}
module.exports = getStoriesComments