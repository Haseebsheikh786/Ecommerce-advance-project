const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true],
    },
    email: {
      type: String,
      required: [true, "please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "please add the user password"],
    },

    Isverified: { type: Boolean, default: false },
    verificationCode: String,
    verificationTimestamp: { type: Date, required: true },
    ResetPasswordCode: String,
    ResetPasswordTimestamp: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
