import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  credits: {
    type: Number,
    default: 5, // free trial credits
    min: 0,
  },
  creations: {
    type: Number,
    default: 0,
    min: 0
  },
  plan: {
    type: String,
    default: "Free",
  },

  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
