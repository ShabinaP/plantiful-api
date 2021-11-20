const mongoose = require("mongoose");
const WishSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    plantId: {
      type: String,
      required: true,
    },  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wish", WishSchema);