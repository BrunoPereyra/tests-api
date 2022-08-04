const supertest = require("supertest")
const { app, server } = require("../index")
const mongoose = require("mongoose")

const api = supertest(app)
test("get stories ok ", async () => {
    await api
        .post("/getStories")
        .expect(401)
        .expect("Content-Type", /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})