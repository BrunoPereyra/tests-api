const supertest = require("supertest");
const { app } = require("../index");

const api = supertest(app);
 
async function signupPost(password = false, nameUser = false, fullName = false) {

    const newUser = {
        password,
        nameUser,
        fullName
    };


    const ress = await api
        .post("/signup")
        .send(newUser)
        .expect(200)
        .set("Accept", "application / json");
    return ress
}
module.exports = { signupPost }
