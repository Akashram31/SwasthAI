const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    gender: {
        type: Number,
        required: true,
        enum: [0, 1]
        // 0 = Female
        // 1 = Male
    }
},
{
    timestamps: true
});


module.exports = mongoose.model("User", userSchema);