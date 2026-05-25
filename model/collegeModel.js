const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "College name is required"],
        trim: true,
        unique: true,
    },
    positiveCount: {
        type: Number,
        default: 0,
    },
    negativeCount: {
        type: Number,
        default: 0,
    },
    neutralCount: {
        type: Number,
        default: 0,
    },
    totalReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Story",
        },
    ],
}, { timestamps: true });

const College = mongoose.model("College", collegeSchema);
module.exports = College;