import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CategorySchema = new Schema(
  {
    title: { type: 'String', required: true },
  },
  { timestamps: true },
)

export const Category = mongoose.model("category", CategorySchema)