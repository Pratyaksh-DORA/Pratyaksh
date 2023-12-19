const ProjectUpdate = require("../models/projectUpdate");
const stringConstants = require("../utilis/strringConstants");
const cloudinary = require("cloudinary").v2;
const CustomError = require("../utilis/customError")
// const uploadImagesToCloudinary = async (images) => {
//     let imagesArray = [];
//     console.log("first")
//     for (let index = 0; index < images.length; index++) {
//         let result = await cloudinary.uploader.upload(images[index].img.tempFilePath, {
//             folder: "siteImages",
//         });
//         console.log(result)
//         imagesArray.push({
//             id: result.public_id,
//             secure_url: result.secure_url,
//             coordinates: images[index].coordinates,
//             coordinates: [1.2, 3.4]
//         });
//     }

//     return imagesArray;
// };

exports.addProjectUpdate = async (req, res, next) => {
    console.log(req.body);
    const { userId, projectId, updateDate, markedPoints, problemsFormData } = req.body;
    
    try {
        const update = await ProjectUpdate.create({
            userId,
            projectId,
            updateDate,
            markedPoints,
            problemsFormData
        });
        res.status(200).json(update);
    } catch (error) {
        console.error(error);
        return next(new CustomError("Error uploading data", 500));
    }
};

exports.getAllUpdatesOfProject = async (req, res, next) => {
    let projectId = req.user.currentProject
    projectId = projectId.toString();
    const updates = await ProjectUpdate.find({ projectId });
    res.status(200).json(updates)
}