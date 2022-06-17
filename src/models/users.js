const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    nameUser: String,
    fullName: String,
    Gmail: String,
    passwordHash: String,
    profileStyle: [
        { title: String },
        { Bcolor: String }
    ],
    followers: Array,
    storys:[{
        type:Schema.Types.ObjectId,
        ref:"storys"
    }]
})
// UserSchema.set("toJSON", {
//     transform: (document, returnedObject) => {
        
//     }
// })

const Users = model("users", UserSchema)
module.exports = Users