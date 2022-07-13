const Storys = require("../models/Story")

const getStories = async (req, ress) => {
    const {limit} = req.body
    const story = await Storys.find({}).sort({ date: -1 }).limit(limit)

    ress.status(202).json({
        ress: story
    })
}
module.exports = getStories