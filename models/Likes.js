const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    plantId: {
      type: String,
      required: true,
      unique: true,
    },
    likesCount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Likes", LikesSchema);