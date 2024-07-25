import { User } from "@/models/User";
import mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {compareSync} from "bcryptjs";
//import { MongoDBAdapter } from "@auth/mongodb-adapter";
//import clientPromise from "./mongoConnect";
//import client from "@/libs/mongoConnect";

export const authOptions = {
  secret: process.env.SECRET as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials) {
            return null;
          }
  
          const email = credentials?.email as string;
          const password = credentials?.password as string;
          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URL as string);
          }
  
          const user = await User.findOne({ email: email }).exec();
          const passwordOk = user && compareSync(password, user.password);
          if(passwordOk){
            return user;
          }
          return null;
        },
      }),
  ],
  //getting an error for storing session in database while if i am using adaptor to store a  session of user then normal login can not able to store a session it is directly show unauthicated if user is successfully login with correct password also so this thing may cause a error!
  //adapter: MongoDBAdapter(clientPromise),
};
