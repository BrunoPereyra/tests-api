const Storys = require("../models/Story")

const getStories = async (req, ress) => {
    const Story = await Storys.find({}).populate("user",{
        nameUser:1,
        _id:0
    })
    ress.json({Story})
}
module.exports = getStories