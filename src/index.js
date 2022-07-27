require("dotenv").config()
require("./db")
const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const handleErrors = require("./middleware/handleErrors")
const useExtractor = require("./middleware/useExtractor")
const notFound = require("./middleware/notFound")
const { PORT } = process.env

app.use(morgan("dev"))

app.use(express.json())
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 
//   }
app.use(cors())

app.use("/signup", require("./routers/signup.routes"))
app.use("/login", require("./routers/login.routes"))
app.use("/makeStories",useExtractor,require("./routers/makestories.routes"))
app.use("/getStories",useExtractor,require("./routers/getStories.routes"))
app.use("/makeComments",useExtractor,require("./routers/comment.routes"))
app.use("/makeCommentsRep",useExtractor,require("./routers/commentRep.routes"))
app.use("/getCommentsRep",useExtractor,require("./routers/getCommentRep.routes"))
app.use("/getStoriesComments",useExtractor,require("./routers/getStoriesComments.routes"))
app.use("/following",useExtractor,require("./routers/following.routes"))
app.use("/saveStory",useExtractor,require("./routers/saveStories.routes"))
app.use("/deletes",useExtractor,require("./routers/deletes.routes"))


app.use(notFound)
app.use(handleErrors)

app.listen(PORT, () => {
    console.log(`server listening in ${PORT}`);
})
