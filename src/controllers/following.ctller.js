const users = require("../models/users")

const following = async (req, ress) => {
    const { idUserF } = req.body
    const iduser = req.idUser
    const user = await users.findById(iduser)

    let userf = {}
    if (idUserF.length == 24 && typeof idUserF == "string") {
        userf = await users.findById(idUserF)
        if (!userf) {
            return ress.status(404).json({
                ress: "user no encontrado"
            })
        }
    } else {
        return ress.status(404).json({
            ress: "missing data"
        })
    }
    
    if (!user) {
        return ress.status(404).json({
            ress: "user no encontrado"
        })
    }



    let following = await user.following.find(e => e == idUserF)
    if (!following && !(iduser == idUserF)) {
        user.following = await user.following.concat(idUserF)
        userf.followers = await userf.followers.concat(user._id)
        await userf.save()
        await user.save()
        return ress.status(202).json({
            ress: "following save"
        })
    } else if ((following == idUserF) && !(iduser == idUserF)) {
        const ifollowing = await user.following.indexOf(idUserF)
        const ifollowers = await userf.followers.indexOf(iduser)
        if (ifollowing !== null && ifollowers !== null) {
            await user.following.splice(ifollowing, 1)
            await userf.followers.splice(ifollowers, 1)
            await user.save()
            await userf.save()
            return ress.status(200).json({
                ress: "remove ok"
            })
        }
    }

}
module.exports = following