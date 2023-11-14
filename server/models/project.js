const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "NOt Started"
    },
    milestones: [
        {
            name: {
                type: String,
                required: true,
            },
            target_date: {
                type: Date
            },
            status: {
                type: String,
                default: "Not Started"
            }
        }
    ]
});

module.exports = mongoose.model("Project", projectSchema)