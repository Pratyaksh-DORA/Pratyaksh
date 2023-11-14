const Project = require("../models/Project");
const CustomError = require("../utilis/customError");

exports.addProject = async (req, res, next) => {

    const { name, description, location, startDate, endDate, milestones, status } = req.body;

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
        milestones
    });

    res.status(200).json(project)
}