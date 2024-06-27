const { Schema, models, model } = require("mongoose");

const TaskDataSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

export const TaskData = models?.TaskData || model("TaskData", TaskDataSchema);
