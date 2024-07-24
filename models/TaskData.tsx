import { Schema, models, model, Document } from "mongoose";

export interface ITaskData extends Document {
  title: string;
  description: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskDataSchema = new Schema<ITaskData>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const TaskData = models.TaskData || model<ITaskData>("TaskData", TaskDataSchema);
