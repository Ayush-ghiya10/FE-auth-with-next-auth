import { signJwt } from "@/utils/jwtHandler";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const redis = new Redis({
  url: process.env.NEXT_PUBLIC_REDIS_URL,
  token: process.env.NEXT_PUBLIC_REDIS_TOKEN,
});
export const authOptions: NextAuthOptions = {
  // adapter: UpstashRedisAdapter(redis),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt", // Store sessions in the database and store a sessionToken in the cookie for lookups
    maxAge: 30 * 24 * 60 * 60, // 30 days to session expiry
    updateAge: 24 * 60 * 60, // 24 hours to update session data into database
  },
  pages: { signIn: "/signin" },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile, user }) {
      console.log({ profile, user });
      const userDetails = (
        await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/user?email=" + profile?.email
        )
      ).data.payload;
      if (userDetails) {
        Object.assign(user, { ...user, ...userDetails });
        return true;
      } else {
        return false;
      }
    },

    async jwt({ token, account, user }) {
      if (account) {
        token.auth_token = await signJwt({
          name: user.name,
          userId: user.userId,
          userEmail: user.userEmail,
          accessLevel: user.accessLevel,
          userGUID: user.userGUID,
        });
      }
      return token;
    },
    async session({ session, token, newSession, user, trigger }) {
      console.log({ session, token, newSession, user, trigger });
      session.auth_token = token.auth_token as string;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
