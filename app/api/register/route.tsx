import mongoose from "mongoose";
import { User } from "../../../models/User";
import {genSaltSync, hashSync} from "bcryptjs";
import { NextRequest } from "next/server";
//const {bcrypt} = require('bcryptjs');

export async function POST(req: NextRequest) {
  const body = await req.json();

  mongoose.connect(process.env.MONGO_URL as string);
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error("password must be at least 5 characters");
  }

  const notHashedPassword = pass;
  var salt = genSaltSync(10)
  body.password = hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}