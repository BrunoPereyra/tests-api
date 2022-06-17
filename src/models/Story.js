const { Schema, model } = require("mongoose")

const StorySchcema = new Schema({
    title: String,
    descriptionStory: String,
    story: String,
    likes:Number,
    user: [{
        type:Schema.Types.ObjectId,
        ref:"users"
    }],
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"comments"
    }]
})
// UserSchema.set("toJSON", {
//     transform: (document, returnedObject) => {

//     }
// })

const Storys = model("storys", StorySchcema)
module.exports = Storys