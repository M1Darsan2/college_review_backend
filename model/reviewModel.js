const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    vibe: {
      type: String,
      enum: ["positive", "negative", "neutral"],
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: function () {
        return !this.isAnonymous;
      },
    },
    anonymousId: {
      type: String,
      required: function () {
        return this.isAnonymous;
      },
    },
    userType: {
      type: String,
      enum: [
        "student",
        "faculty",
        "alumini",
        "parent",
        "other",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
module.exports = Story;