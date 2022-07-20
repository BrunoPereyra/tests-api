const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    nameUser: String,
    avatar:String,
    fullName: String,
    Gmail: String,
    passwordHash: String,
    followers: [],
    following: [],
    date: Date,
    saveStorys:[],
    storys: [{
        type: Schema.Types.ObjectId,
        ref: "storys"
    }]
})
// UserSchema.set("toJSON", {
//     transform: (document, returnedObject) => {

//     }
// })

const Users = model("users", UserSchema)
module.exports = Users