import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongodb } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongodb();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordIsValid = await bcrypt.compare(password, user.password);

          if (!passwordIsValid) {
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error:", error);
          throw error; // You should propagate the error to handle it
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/Login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
