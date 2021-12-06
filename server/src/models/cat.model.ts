import { Schema, model } from "mongoose";

const catSchema = new Schema({
  name: { type: String, required: "Can't create a cat without a name " },
});

export const cat = model("cat", catSchema);
