import mongoose from "mongoose";

interface IUserSchema {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: 50,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
