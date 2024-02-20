import axios from "axios";
import NextAuth, { DefaultUser, NextAuthOptions, User } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: { signIn: "/signin" },
  callbacks: {
    async signIn({ profile, user }) {
      const userDetails = (
        await axios.get("http://localhost:3001/user?email=" + profile?.email)
      ).data.payload;
      if (userDetails) {
        Object.assign(user, { ...user, ...userDetails });
        return true;
      } else {
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }
      return token;
    },

    session({ session, token }) {
      return {
        ...session,
        ...token,
      };
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
