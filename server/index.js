const app = require("./app")

const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, function (error,) {
    if (error)
        console.log(`Error in seeeting up sever \n error : ${error}`)
    console.log(`server is running on port ${process.env.PORT}`)
})