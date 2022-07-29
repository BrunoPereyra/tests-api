const Storys = require("../models/Story")
const Users = require("../models/users")

const makeStories = async (req, ress) => {
    const { title, descriptionStory, story, imgStory, theme } = req.body
    const { idUser } = req
    if (!title || !descriptionStory || !story || !imgStory ||
        (theme == "misterio" || theme == "extraterrestre" || theme == "fantasmas"
        ) == false
        ) {
        return ress.status(400).json({
            ress: "missing data"
        })
    }

    const Story = new Storys({
        title,
        descriptionStory,
        story,
        imgStory,
        theme,
        user: idUser,
        date: new Date(),
    })
    try {
        const saveStory = await Story.save()
        const users = await Users.findById(idUser)
        users.storys = await users.storys.concat(saveStory._id)
        await users.save()
        return ress.json({
            ress: "story save"
        })
    } catch (error) {
        return ress.status(400).json({
            ress: error
        })
    }

}
module.exports = makeStories;
