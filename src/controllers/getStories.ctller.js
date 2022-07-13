const Storys = require("../models/Story")

const getStories = async (req, ress) => {
    const Story = await Storys.find((search)=>{
        console.log(search);
    }).populate("user",{
        nameUser:1,
        _id:0
    })
}
module.exports = getStories