import mongoose from "mongoose";
import { nanoid } from "nanoid";





const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: () => nanoid(10)
    },
    googleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      default: "null",
    },
    slug: {
      type: String,
      lowercase: true,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    // picture: String,
    phoneNumber: {
      type: String,
      default: "null",
      //   required: true,
    },
    addresses: {
      type: String,
      default: "null",
      //   required: true,
    },
    pincode: {
      type: Number,
      default: 0
    },
    city: {
      type: String,
      default: "null"
    },
    state: {
      type: String,
      default: "null"
    },
    roll: {
      type: Number,
      default: 0,
    },

    token: {
      type: String,
    }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("users", userSchema);