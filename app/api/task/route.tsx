import mongoose from "mongoose";
import { TaskData, ITaskData } from "../../../models/TaskData";
import { NextRequest, NextResponse } from "next/server";

// Connect to MongoDB
async function connectToDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL as string);
  }
}

export async function GET(req: NextRequest) {
  await connectToDB();
  const tasks = await TaskData.find();
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  await connectToDB();
  const data: ITaskData = await req.json();
  const data_create = await TaskData.create(data);
  return NextResponse.json(data_create);
}

export async function DELETE(req: NextRequest) {
  await connectToDB();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    await TaskData.deleteOne({ _id });
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: "ID not provided" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  await connectToDB();
  const { _id, ...data }: ITaskData & { _id: string } = await req.json();
  if (_id) {
    await TaskData.findByIdAndUpdate(_id, data);
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: "ID not provided" }, { status: 400 });
  }
}
