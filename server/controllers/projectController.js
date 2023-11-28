const Project = require("../models/project");
const User = require("../models/user")
const CustomError = require("../utilis/customError");
const stringConstants = require("../utilis/strringConstants")

exports.addProject = async (req, res, next) => {

    const { name } = req.body;

    const user = req.user.id;

    if (!name) {
        return (next(new CustomError(stringConstants.noName, 400)));
    }


    const fetchedProject = await Project.findOne({ name });

    if (fetchedProject) {
        return (next(new CustomError(stringConstants.nameExsist, 400)));
    };

    const project = await Project.create({
        name,
        // description,
        // location,
        // startDate,
        // endDate,
        // milestones,
        user
    });

    const updateUserProjectAccess = await User.findByIdAndUpdate(user, {
        $push: { projects: project._id },
        currentProject: project._id,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });


    res.status(200).json({ project, updateUserProjectAccess })
}

exports.getOneProject = async (req, res, next) => {
    const project = await Project.findById(req.params.id);


    if (!project) {
        return (next(new CustomError(stringConstants.noProject, 401)));
    }
    const userId = req.user.id
    const updatedUser = await User.findByIdAndUpdate(userId, { currentProject: project._id }, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })
    res.status(200).json({
        sucess: true,
        project,
        updatedUser
    })
}

exports.getAllProjectOfUser = async (req, res, next) => {
    const user = req.user.id

    const allProjects = await Project.find({ user });


    res.status(200).json(allProjects)
}

exports.getAllUsersOfProject = async (req, res, next) => {
    let projectId = req.user.currentProject;
    projectId = projectId.toString();

    const users = await User.find({ projects: projectId });

    res.status(200).json(users)

}

