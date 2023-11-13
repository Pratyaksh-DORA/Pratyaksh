const app = require("./app")

app.listen(process.env.PORT, function (error,) {
    if (error)
        console.log(`Error in seeeting up sever \n error : ${error}`)
    console.log(`server is running on port ${process.env.PORT}`)
})