const ProjectUpdate = require("../models/projectUpdate");

exports.addProjectUpdate = async (req, res, next) => {
    const userId = req.user.id;
    let projectId = req.user.currentProject;
    console.log(projectId)
    projectId = projectId.toString();
    const { progressPercentage, externalFactors } = req.body;
    const updateDate = new Date();

    updateDate.setHours(0, 0, 0, 0);

    const todayExsist = await ProjectUpdate.findOne({ updateDate });

    if (todayExsist) {
        return next(new CustomError("Today's update already exists, reupdate for further changes", 400));
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
