const users = require("../models/users")
const Story = require("../models/Story")

const saveStories = async (req, ress) => {
    const iduser = req.idUser
    const { saveId } = req.body
    const user = await users.findById(iduser)

    if (user == null) {
        return ress.status(404).json({
            ress: "user no existe"
        })
    }
    let storyS = {}
    if (saveId.length == 24 && typeof saveId == "string") {
        storyS = await Story.findById(saveId)
        if (!storyS) {
            return ress.status(404).json({
                ress: "user no encontrado"
            })
        }
    } else {
        return ress.status(404).json({
            ress: "missing data"
        })
    }

    let saveStory = await user.saveStorys.find(e => e == saveId)
    console.log(following);
    if (!saveStory) {
        user.saveStorys = await user.saveStorys.concat(saveId)
        await user.save()
        return ress.status(202).json({
            ress: "story save"
        })
    } else if ((saveStory == saveId)) {
        const saveD = await user.saveStorys.indexOf(saveId)

        if (saveD !== null) {
            await user.saveStorys.splice(saveD, 1)
            await user.save()
            return ress.status(200).json({
                ress: "remove ok"
            })
        }else{
            return ress.status(400).send({ress:"saveD == null"})
        }
    }

}
module.exports = saveStories