const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const authorization = req.get('authorization')
    let token = ""

    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        token = authorization.substring(7)
    }
    try {
        const decodetoken = jwt.verify(token, process.env.privateKey)
        if (!token || !decodetoken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        req.idUser = decodetoken.id
        next()
    } catch (error) {
        return res.status(401).json({ error: 'token missing or invalid' })
        next()
    }
}