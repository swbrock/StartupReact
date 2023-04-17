import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Session } from "next-auth";
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // We want to allow spoofing the database user for testing purposes.
  // This is only allowed in development, and needs to be posted as a JSON object.

  return await NextAuth(req, res, {
    providers: [
      {
        id: "byu-pkce",
        name: "BYU Authentication",
        type: "oauth",
        wellKnown:
          "https://tyk-hydra-prd.byu-oit-apimanager-prd.amazon.byu.edu/.well-known/openid-configuration",
        checks: ["pkce", "state"],
        client: {
          // Forces the client to authenticate with PKCE and Authorization Code Flow
          token_endpoint_auth_method: "none",
        },
        clientId: process.env.NEXTAUTH_CLIENT_ID,
        profile(profile, tokens) {
          return {
            id: profile.sub,
            firstName: profile.preferred_first_name,
            lastName: profile.surname,
            netId: profile.net_id,
            accessToken: tokens.access_token,
            expiresAt: profile.exp,
            tokenType: tokens.token_type,
            byuId: profile.byu_id,
          };
        },
      },
    ],
    callbacks: {
      /**
       * Use this to get the user's info from the database, if you want to add it to the session
       * Example:
       *
       * ```
       * try {
       *    const user = await getUser(session.user.accessId, session.user.netId);
       *    session.user = { ...session.user, ...user };
       * } catch (error) {
       *    console.error(error);
       * }
       * ```
       */
      async session({ session, token }) {
        session.user = token.user as Session["user"];
        // If we are in development, we want to allow the user to log in as any user.
        // This is useful for testing the application.
        if (process.env.NODE_ENV === "development") {
          // Check if it is a call to /api/auth/session?spoof
          // This url won't be exposed in production, so it is safe to use.
          if (req.url === "/api/auth/session?spoof") {
            // Get the user to spoof from the request body.
            const spoofNetId = req.headers["x-spoof-netid"];
            if (spoofNetId) {
              session.user.netId = spoofNetId.toString();
              session.user.fakedNetId = spoofNetId.toString();
              // Do your spoofing here, like getting the user from the database.
              // If you need to update the type object, its in models/next-auth.d.ts, just add an object to the user property, or adjacent to it.
            }
          }
        }

        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.user = user;
        }
        return token;
      },
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url;
        // Allow callback urls to byu.edu
        else if (new URL(url).origin === "https://api.byu.edu") return url;
        return baseUrl;
      },
    },
  });
}
