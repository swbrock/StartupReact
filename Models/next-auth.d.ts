import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      firstName: string;
      lastName: string;
      netId: string;
      accessToken: string;
      expiresAt: number;
      tokenType: string;
      byuId: string;
      fakedNetId?: string;
    };
    // You can add any additional properties here, like the users info from the database
  }
}
