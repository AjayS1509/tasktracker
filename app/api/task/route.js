import mongoose from "mongoose";
import { TaskData } from "../../../models/TaskData";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(await TaskData.find());
}

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const data_create = await TaskData.create(data);
  return Response.json(data_create);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await TaskData.deleteOne({ _id });
  return Response.json(true);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, ...data } = await req.json();
  await TaskData.findByIdAndUpdate(_id, data);
  return Response.json(true);
}
