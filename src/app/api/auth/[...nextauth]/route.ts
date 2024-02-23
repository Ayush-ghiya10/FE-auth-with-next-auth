import { signJwt } from "@/utils/jwtHandler";
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: { signIn: "/signin" },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.auth_token = await signJwt({
          sub: token.sub,
          id_token: account.id_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
        });
      }
      return token;
    },
    async session({ session, token }) {
      session.auth_token = token.auth_token as string;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
