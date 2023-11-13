const mongoose = require("mongoose")

const connectWithDatabase = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`Database connected succesfully`)
        })
        .catch((error) => {
            console.log(`Database connection issues \n`)
            console.log(error)
        })
}
module.exports = connectWithDatabase;