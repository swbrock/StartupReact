// TODO convert this back to typescript once nextauth fixes their type collisions, or I manually do it
import { withAuth } from "next-auth/middleware";
export default withAuth({
  pages: {
    signIn: `/auth/signin`,
  },
  callbacks: {
    authorized: ({ req, token }) => {
      // Needed to allow nextauth to work with nextjs api routes but only in prod for some reason
      if (
        req.nextUrl.pathname.startsWith("/_next") ||
        req.nextUrl.pathname.startsWith("/api/auth")
      ) {
        return true;
      }
    },
  },
});
