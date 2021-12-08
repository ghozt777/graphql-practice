import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Can't create a user without a name",
    },
    email: {
      type: String,
      required: "cant create a user without a username",
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 40,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const user = model("user", userSchema);
