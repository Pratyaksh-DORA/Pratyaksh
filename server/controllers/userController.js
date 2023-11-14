const User = require("../models/User");
const CustomError = require("../utilis/customError");
const cookieToken = require("../utilis/cookieToken")


exports.signup = async (req, res, next) => {
    const { username, email, password } = req.body

    if (!username) {
        return (next(new CustomError("Username is required for SignUp", 400)));
    }
    if (!email) {
        return (next(new CustomError("Email is required for SignUp", 400)));
    }
    if (!password) {
        return (next(new CustomError("Password is required for SignUp", 400)));
    }

    const fetchedUsername = await User.findOne({ username });
    if (fetchedUsername) {
        return (next(new CustomError("Username already exsist, try with new username", 400)))
    }
    const fetchedEmail = await User.findOne({ email })
    if (fetchedEmail) {
        return (next(new CustomError("Email already exsist, try different email", 400)))
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    cookieToken(user, res)

};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username) {
        return (next(new CustomError("Username is required for login", 400)));
    }
    if (!password) {
        return (next(new CustomError("Password is required for login", 400)));
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
        return (next(new CustomError("You have not registered to our product, signup before login", 400)));
    }
    const isPasswordCorrect = await user.isValidatedPassword(password);

    if (!isPasswordCorrect) {
        return (next(new CustomError("Incorrect password", 400)));
    }

    cookieToken(user, res);
}

exports.logout = async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(0),
        httpOnly: true
    })

    res.status(204).json({
        success: true,
        message: "Logout succesful"
    })

}

exports.createUser = async (req, res, next) => {

    const { role, id, currentProject } = req.user
    let userRole = "projectManager";
    if (role == "projectManager") {
        userRole = "dataEntry"
    }

    const { username, email, password } = req.body

    let projects = [];
    projects.push(currentProject);

    if (!username) {
        return (next(new CustomError("Username is required for SignUp", 400)));
    }
    if (!email) {
        return (next(new CustomError("Email is required for SignUp", 400)));
    }
    if (!password) {
        return (next(new CustomError("Password is required for SignUp", 400)));
    }
    if (!currentProject && userRole == "dataEntry") {
        return (next(new CustomError("Select a project first to add dataEntry", 400)))
    }

    const fetchedUsername = await User.findOne({ username });
    const fetchedEmail = await User.findOne({ email });
    let user;

    if (fetchedEmail && fetchedUsername) {

        user = await User.findByIdAndUpdate(fetchedUsername._id,
            { $addToSet: { projects: currentProject, currentProject: currentProject } },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })

    } else {
        if (fetchedEmail) {
            return (next(new CustomError("Email already exsist, try different email", 400)))
        }
        if (fetchedUsername) {
            return (next(new CustomError("Username already exsist, try with new username", 400)))
        }


        user = await User.create({
            username,
            email,
            currentProject,
            password,
            role: userRole,
            projects
        });
    }




    res.status(200).json(user);
}