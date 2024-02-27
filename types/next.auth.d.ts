import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session extends Session {
    auth_token: string;
  }
  interface User extends User {
    userId: number;
    userEmail: string;
    accessLevel: string;
    userGUID: string;
  }
}
