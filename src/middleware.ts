import withAuth from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/signin" },
});

export const config = {
  // restricted routes
  matcher: ["/", "/admin/:path*"],
};
