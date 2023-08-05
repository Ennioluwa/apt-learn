import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please fill in a valid email address"],
    },
    password: {
      type: String,
      required: "Password is required",
      //   min: 6,
      //   max: 64,
    },
    picture: {
      type: String,
      default: "/avatar.png",
    },
    educator: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
