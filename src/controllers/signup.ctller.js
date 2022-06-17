const bcrypt = require("bcrypt")
const Users = require("../models/users")

const Signup = async (req, ress) => {
    const { password, nameUser, fullName } = req.body
    const userRepeat = await Users.findOne({ nameUser })

    if (!password || !nameUser || !fullName ||
            typeof password !== "string" ||
            typeof nameUser !== "string" ||
            typeof fullName !== "string"
        ) {
    ress.status(400).send("missing data or type data faild")
} else if (userRepeat) {
    ress.json({
        ress: "user repeat"
    })
} else if (!userRepeat && password && nameUser && fullName) {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await new Users({
        nameUser,
        fullName,
        passwordHash
    })
    await user.save()
    ress.status(200).json({
        ress: "user save"
    })

} else {
    ress.status(404).json({
        ress: "faliles,new user"
    })
}
}
module.exports = Signup