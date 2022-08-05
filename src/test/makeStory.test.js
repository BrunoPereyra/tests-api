// const supertest = require("supertest")
// const { server, app } = require("../index")
// const mongoose = require("mongoose")


// const newStory = {
//     title: "aaa",
//     descriptionStory: "daslñpd,lpas",
//     story: "aqs",
//     imgStory: "asas",
//     theme: "misterio"
// }

// describe("POST - story", async () => {
//     const ress = await supertest(app)
//         .post("/makeStories")
//         .send(newStory)
//         .expect(200)
//         .expect('Accept', 'application/json')
    
//     test('post', () => { second })
//     console.log(ress);
// })

// afteterAll(() => {
//     server.close()
//     mongoose.connection.close()
// })