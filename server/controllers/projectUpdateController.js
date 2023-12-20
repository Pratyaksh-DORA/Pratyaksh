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
        imageDataList.forEach(imageData => {
            imageLoc = imageData;
        });
        console.log(imageLoc);

        const estimateApi = await axios.post("https://e296-223-26-31-186.ngrok-free.app/",{
            "img" : imageLoc
        });
        const noOfBricks = estimateApi.data.bricks;
        const progress = 20;

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
        console.error(error);
        return next(new CustomError("Error uploading data", 500));
    }
};

exports.getAllUpdatesOfProject = async (req, res, next) => {
    console.log(req.user);
    let projectId = req.user.currentProject
    projectId = projectId.toString();
    console.log(projectId);
    const updates = await ProjectUpdate.find({ projectId });
    console.log(updates);
    res.status(200).json(updates)
    
}