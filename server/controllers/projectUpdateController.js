const ProjectUpdate = require("../models/projectUpdate");
const stringConstants = require("../utilis/strringConstants");
const cloudinary = require("cloudinary").v2;
const CustomError = require("../utilis/customError")
const uploadImagesToCloudinary = async (images) => {
    let imagesArray = [];
    console.log("first")
    for (let index = 0; index < images.length; index++) {
        let result = await cloudinary.uploader.upload(images[index].img.tempFilePath, {
            folder: "siteImages",
        });
        console.log(result)
        imagesArray.push({
            id: result.public_id,
            secure_url: result.secure_url,
            coordinates: images[index].coordinates,
            coordinates: [1.2, 3.4]
        });
    }

    return imagesArray;
};

exports.addProjectUpdate = async (req, res, next) => {
    const userId = req.user.id;
    let projectId = req.user.currentProject;

    projectId = projectId.toString();
    const { progressPercentage, externalFactors } = req.body;
    const updateDate = new Date();

    updateDate.setHours(0, 0, 0, 0);

    // const todayExist = await ProjectUpdate.findOne({ updateDate });

    // if (todayExist) {
    //     return next(new CustomError(stringConstants.updateExist, 400));
    // }
    const images = req.files.images
    if (!images) {
        return (next(new CustomError("imge illa", 400)))
    }

    try {
        let uploadedImages = [];
        console.log(images)
        if (images) {
            uploadedImages = await uploadImagesToCloudinary(images);
            console.log("lok")
        }

        const update = await ProjectUpdate.create({
            userId,
            projectId,
            updateDate,
            progressPercentage,
            externalFactors,
            siteImages: uploadedImages,
        });

        res.status(200).json(update);
    } catch (error) {
        console.error(error);
        return next(new CustomError("Error uploading images", 500));
    }
};

exports.getAllUpdatesOfProject = async (req, res, next) => {
    let projectId = req.user.currentProject
    projectId = projectId.toString();
    const updates = await ProjectUpdate.find({ projectId });
    res.status(200).json(updates)
}

