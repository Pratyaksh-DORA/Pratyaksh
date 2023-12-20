const axios = require('axios');
const ProjectUpdate = require("../models/projectUpdate");
const stringConstants = require("../utilis/strringConstants");
const cloudinary = require("cloudinary").v2;
const CustomError = require("../utilis/customError");

exports.addProjectUpdate = async (req, res, next) => {
    console.log(req.body);
    const { userId, projectId, updateDate, markedPoints, problemsFormData, materialsFormData, weatherInformation } = req.body;

    try {
        const imageDataList = markedPoints.map(point => point.imageData);

        let imageLoc;
        let progress;
        imageDataList.forEach(imageData => {
            imageLoc = imageData;
        });
        console.log(imageLoc);

        const estimateApi = await axios.post("https://b5b9-223-26-31-186.ngrok-free.app/",{
            "img" : imageLoc
        });
        const noOfBricks = estimateApi.data.bricks;


        const lastUpdates = await ProjectUpdate.find({ projectId }).sort({ updateDate: 'desc' }).exec();
        console.log(lastUpdates.length);
        if (lastUpdates.length > 0) {
            const lastUpdate = lastUpdates[0];

            const prevImageDataList = lastUpdate.markedPoints.map(point => point.imageData);

            let prevImageLoc;
            prevImageDataList.forEach(imageData => {
                prevImageLoc = imageData;
            });

            const processStatus = await axios.post("https://fbd8-223-26-31-186.ngrok-free.app/",{
                "prev_img" : prevImageLoc,
                "img" : imageLoc
            });
            progress = processStatus.data.progress;
        }

        const update = await ProjectUpdate.create({
            userId,
            projectId,
            updateDate,
            markedPoints,
            problemsFormData,
            materialsFormData,
            weatherInformation,
            noOfBricks,
            progress
        });
        console.log(update);
        res.status(200).json(update);
    } catch (error) {
        console.log(error);
        return next(new CustomError("Error uploading data", 500));
    }
};

exports.getAllUpdatesOfProject = async (req, res, next) => {
    console.log(req.user);
    let projectId = req.user.currentProject;
    projectId = projectId.toString();
    console.log(projectId);
    const updates = await ProjectUpdate.find({ projectId });
    console.log(updates);
    res.status(200).json(updates)

}