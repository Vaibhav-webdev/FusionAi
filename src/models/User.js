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
  AllCreation: {
      ArticleGen: [
        {
          topic: { type: String },
          length: { type: String } // e.g. "500 words"
        }
      ],

      KeywordGen: [
        {
          topic: { type: String },
          style: { type: String }
        }
      ],
      TitleGen: [
        {
          topic: { type: String },
          style: { type: String },
          platform: { type: String }
        }
      ],

      EmailWriter: [
        {
          describe: { type: String },
          additional: { type: String },
          tone: { type: String }
        }
      ]
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
