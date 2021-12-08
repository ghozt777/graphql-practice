import { Schema, model } from "mongoose";

const catSchema = new Schema(
  {
    name: { type: String, required: "Can't create a cat without a name " },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const cat = model("cat", catSchema);
