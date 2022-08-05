const mongoose = require("mongoose");
const { server } = require("../index");
const { signupPost } = require("./helpers")


test('SIGNUP : user ok', async () => {
    const  ress  = await signupPost("123456789", "Bruno", "bruno Pereyra")
    console.log(ress);
    expect(ress.ress).toBe("user repeat")
    expect(ress.statusCode).toBe(200)
})

afterAll(() => {
    server.close();
    mongoose.connection.close();
})