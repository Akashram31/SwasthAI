const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    bmi: {
        type: Number,
        required: true
    },

    // ======================================================
    // NEW FEATURE: HIGH BLOOD PRESSURE
    // ======================================================

    highBP: {
        type: Number,
        enum: [0, 1],
        required: true
    },

    // ======================================================
    // NEW FEATURE: HIGH CHOLESTEROL
    // ======================================================

    highChol: {
        type: Number,
        enum: [0, 1],
        required: true
    },

    smoking: {
        type: Number,
        enum: [0, 1],
        required: true
    },

    alcohol: {
        type: Number,
        enum: [0, 1],
        required: true
    },

    physicalActivity: {
        type: Number,
        enum: [0, 1],
        required: true
    },

    fruitsConsumption: {
        type: Number,
        enum: [0, 1],
        required: true
    },

    veggiesConsumption: {
        type: Number,
        enum: [0, 1],
        required: true
    },

    generalHealth: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    difficultyWalking: {
        type: Number,
        enum: [0, 1],
        required: true
    },

    riskProbability: {
        type: Number,
        default: 0
    },

    riskLevel: {
        type: String,
        default: ""
    },

    shapFactors: [
        {
            feature: String,
            contribution: Number
        }
    ],

    recommendations: [
        {
            type: String
        }
    ]
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Assessment", assessmentSchema);