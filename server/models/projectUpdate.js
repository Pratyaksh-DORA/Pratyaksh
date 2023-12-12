const mongoose = require("mongoose");

const projectUpdateSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    updateDate: {
        type: Date,
        // required: true,
        default: Date.now()
    },
    progressPercentage: {
        type: Number,
        // required: true,
        default: 0
    },
    externalFactors: [
        {
            name: {
                type: String,
                // required: true
            },
            description: {
                type: String,
                // required: true
            },
            impact: {
                type: String,
                enum: ['delay', 'acceleartion', 'noImpact'],
                default: 'noImpact'
            },
            severity: {
                type: String,
                enum: ['low', 'medium', 'high', 'critical'],
                default: 'low'
            }
        }
    ],
    siteImages: [
        {
            sitePlan: String,
            id: {
                type: String,
                // required: true,
            },
            secure_url: {
                type: String,
                // required: true,
            },
            coordinates: {
                type: [Number],
            }
        },
    ],

});

module.exports = mongoose.model("ProjectUpdate", projectUpdateSchema)