const bcrypt = require("bcrypt")
const Users = require("../models/users")

const Signup = async (req, ress) => {
    const { password, nameUser, fullName } = req.body
    let userRepeat = {}
    if (typeof (password) == "string" && typeof (nameUser) == "string" && typeof (fullName) == "string") {
        userRepeat = await Users.findOne({ nameUser })
        console.log(fullName);
    } else {
        return ress.status(400).send({ress:"missing data or type data faild"})
    }

    if (userRepeat) {
        return ress.status(200).json({
            ress: "user repeat"
        })

    } else if (!userRepeat) {
        try {
            const passwordHash = await bcrypt.hash(password, 10)
            const user = await new Users({
                nameUser,
                fullName,
                passwordHash,
                date: new Date(),
            })
            await user.save()
            ress.status(200).json({
                ress: "user save"
            })
        } catch {
            ress.status(400).json({
                ress: "error"
            })
        }

    }
}
module.exports = Signup