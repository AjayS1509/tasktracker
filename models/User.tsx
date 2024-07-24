import { model, models, Schema, Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);