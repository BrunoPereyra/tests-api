const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Users = require("../models/users")

const Login = async (req, ress) => {
    const { password, nameUser } = req.body
    const user = await Users.findOne({ nameUser })
    if (!user || password == null ||typeof password !== "string" ) {
        ress.status(404).json({
            ress: "user name not exist or password null"
        })
    } else {
        const passwordHash = await bcrypt.compare(password, user.passwordHash)
        if (passwordHash) {

            const useForToken = {
                id: user._id,
                nameUser: user.nameUser
            }
            const { privateKey } = process.env
            const token = jwt.sign(useForToken, privateKey)

            ress.status(200).json({
                token,
                nameUser
            })
        }else{
            ress.status(400).json({
                ress:"user name not exist or password null"
            })
        }
    }

}
module.exports = Login