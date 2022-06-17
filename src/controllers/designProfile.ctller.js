const Users = require("../models/users")
const designProfile = async (req, ress) => {

    const { fonts, Bcolor } = req.body
    const id = req.idUser
    const user = await Users.findById(id)
    if (fonts && Bcolor) {
        user.profileStyle[0] = fonts
        user.profileStyle[1] = Bcolor
        user.save()
            .then(() => ress.status(204).json({ ress: "profileStyle ok"}))
            .catch(err=>ress.status(400).json({ress:`profileStyle fail ${err}`}))
    } 

}
module.exports = designProfile