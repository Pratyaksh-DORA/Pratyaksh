const ProjectUpdate = require("../models/projectUpdate");
const stringConstants = require("../utilis/strringConstants");

exports.addProjectUpdate = async (req, res, next) => {
    const userId = req.user.id;
    let projectId = req.user.currentProject;

    projectId = projectId.toString();
    const { progressPercentage, externalFactors } = req.body;
    const updateDate = new Date();

    updateDate.setHours(0, 0, 0, 0);

    const todayExsist = await ProjectUpdate.findOne({ updateDate });

    if (todayExsist) {
        return next(new CustomError(stringConstants.updateExsist, 400));
    }

    const update = await ProjectUpdate.create({
        userId,
        projectId,
        updateDate,
        progressPercentage,
        externalFactors
    });

    res.status(200).json(update);
};

exports.getAllUpdatesOfProject = async (req, res, next) => {
    let projectId = req.user.currentProject
    projectId = projectId.toString();
    const updates = await ProjectUpdate.find({ projectId });
    res.status(200).json(updates)
}
