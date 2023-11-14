const Project = require("../models/Project");
const User = require("../models/User")
const CustomError = require("../utilis/customError");

exports.addProject = async (req, res, next) => {

    const { name, description, location, startDate, endDate, milestones, status } = req.body;
    const user = req.user.id;

    if (!name) {
        return (next(new CustomError("Project name is required", 400)));
    }
    if (!description) {
        return (next(new CustomError("Project Description is required", 400)));
    }
    if (!location) {
        return (next(new CustomError("Project Location is required", 400)));
    }
    if (!startDate) {
        return (next(new CustomError("Project Start Date is required")));
    }
    if (!endDate) {
        return (next(new CustomError("Project End Date is required")));
    }
    if (!milestones) {
        return (next(new CustomError("Project Milestones is required")));
    }

    const fetchedProject = await Project.findOne({ name });

    if (fetchedProject) {
        return (next(new CustomError("Project with this name already exsist, choose other")));
    };

    const project = await Project.create({
        name,
        description,
        location,
        startDate,
        endDate,
        milestones,
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
        return (next(new CustomError("Project not found", 401)));
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