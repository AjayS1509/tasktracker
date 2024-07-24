import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../../../models/User";
import { compareSync } from "bcryptjs";

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
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
        console.log("cc",email, password)
        if (mongoose.connection.readyState === 0) {
          await mongoose.connect(process.env.MONGO_URL as string);
        }

        const user = await User.findOne({ email: email }).exec();
        console.log("ss",user)
        const passwordOk = user && compareSync(password, user.password);
        if(passwordOk){
          return user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
