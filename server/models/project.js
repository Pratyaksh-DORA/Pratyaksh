const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String
    },
    sector: {
        type: String,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },
    startDate: {
        type: Date,

    },
    endDate: {
        type: Date,

    },
    status: {
        type: String,

        default: "NOt Started"
    },
    milestones: [
        {
            name: {
                type: String,

            },
            target_date: {
                type: Date
            },
            status: {
                type: String,
                default: "Not Started"
            },
            "tasks": [
                {

                    name: String,
                    description: String,
                    dueDate: Date,
                    assigned: {
                        type: mongoose.Schema.ObjectId,
                        ref: "User",

                    },
                    priority: {
                        type: String,
                        enum: ['Low', 'High', 'Medium', 'Urgent'],
                        default: 'Low'
                    },
                    status: {
                        type: String,
                        default: "Not Started"
                    },
                },]
        }
    ],
    sitePlan: [
        {
            name: String,
            id: {
                type: String,

            },
            secure_url: {
                type: String,

            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Project", projectSchema)