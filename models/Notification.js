const { BSONSymbol } = require("mongodb");
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: { type: Schema.Types.ObjectId, ref: "User"},
      required: true,
      unique: true,
    },
    plantId: {
      type: { type: Schema.Types.ObjectId, ref: "Plant"},
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    watered: {
      type: Boolean,
      default: false,
    },

    wateringCount: {
      type: Number,
      required: true,
    },
    lastNotification: {
      type: Date,
      required: true,
    },
    nextNotification: {
      type: Date,
    },
    notificationCount: {
      type: Number,
    },

    frequency: {
      type: String,
      required: true,
    },
    plantName: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);