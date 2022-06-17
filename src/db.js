const mongoose = require("mongoose")
const { db } = process.env

mongoose.connect(db)
    .then(()=> console.log(`db on`))
    .catch(error => console.log(error))