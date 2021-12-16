import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      reqiured: "Can't create a post without a title",
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const post = model("post", postSchema);
