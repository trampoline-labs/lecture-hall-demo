import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // the middleware fn above will only run when this returns true
      // if this returns false, user will be sent to the login page
      authorized({ token }) {
        // this is saying before a user can visit the pages in matcher
        // he at least needs to be logged in, then we can talk further in the middleware fn above
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin", "/admin/:path*"],
};
