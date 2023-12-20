const mongoose = require("mongoose");

const markedPointSchema = new mongoose.Schema({
    image: { 
        type: String, 
    },
    imageData: { 
        type: String, 
    },
    pointId: { 
        type: String, 
    },
    x: { 
        type: Number,  
    },
    y: { 
        type: Number, 
    },
});

const problemsFormDataSchema = new mongoose.Schema({
    effect: { 
        type: String, 
    },
    problem: { 
        type: String, 
    },
    reason: { 
        type: String, 
    },
    severity: { 
        type: String, 
    },
});

const materialsFormDataSchema = new mongoose.Schema({
    material: { 
        type: String, 
    },
    quantityUsed: { 
        type: String, 
    },
});

const weatherInformationSchema = new mongoose.Schema({
    aqi: { 
        type: Number, 
        required: true 
    },
    feels_like: { 
        type: Number, 
        required: true 
    },
    grnd_level: { 
        type: Number, 
        required: true 
    },
    humidity: { 
        type: Number, 
        required: true 
    },
    pressure: { 
        type: Number, 
        required: true 
    },
    sea_level: { 
        type: Number, 
        required: true 
    },
    temp: { 
        type: Number, 
        required: true 
    },
    temp_kf: { 
        type: Number, 
        required: true 
    },
    temp_max: { 
        type: Number, 
        required: true 
    },
    temp_min: { 
        type: Number, 
        required: true 
    },
});

const projectUpdateSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    updateDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    markedPoints: { 
        type: [markedPointSchema], 
        required: true 
    },
    problemsFormData: { 
        type: [problemsFormDataSchema], 
        required: true 
    },
    materialsFormData: {
        type: [materialsFormDataSchema], 
        required: true 
    },
    weatherInformation: {
        type: [weatherInformationSchema],
        required: true
    },
    noOfBricks: {
        type: Number,
        required: true
    },
    progress: {
        type: Number,
    }
});

module.exports = mongoose.model("ProjectUpdate", projectUpdateSchema)