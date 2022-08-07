const mongoose = require("mongoose");
const { server } = require("../index");
const { signupPost } = require("./helpers")


test('SIGNUP : user ok', async () => {
    const ress = await signupPost("123456789", "Bruno", "bruno Pereyra")
    expect(ress.body.ress == "user save" || ress.body.ress == "user repeat").toBeTruthy()
    expect(ress.statusCode).toBe(200)
})

test('SIGNUP : missing data ok', async () => {
    const ress = await signupPost("123456789", "Bruno12")
    expect(ress.body.ress).toBe("missing data or type data faild")
    expect(ress.statusCode).toBe(400)
})

afterAll(() => {
    server.close();
    mongoose.connection.close();
})