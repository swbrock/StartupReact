import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { AccountCircle } from "@mui/icons-material";
import { DateTime } from "luxon";

const SignInButton = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    // Sign user back in if the session has expired
    console.log(session);
    if (status === "authenticated") {
      // ExpireAt is a NumericDate, which is Seconds since the epoch, not Milliseconds
      const expireAt = DateTime.fromSeconds(session.user.expiresAt);
      const now = DateTime.local();

      if (now > expireAt) {
        signIn("byu-pkce");
      } else {
        const timeout = expireAt.diff(now).as("milliseconds");
        const timer = setTimeout(() => {
          signIn("byu-pkce");
        }, timeout);
        return () => clearTimeout(timer);
      }
    }
  }, [session, status]);
  return (
    <Box
      display="flex"
      flexDirection="row"
      padding={2}
      slot="user"
      color="white"
      gap={0.5}
    >
      {status === "authenticated" && (
        <Box display="inline-flex">
          <Typography noWrap fontWeight="500" m="auto">
            {session.user?.firstName}
          </Typography>
        </Box>
      )}
      <Button
        variant="text"
        startIcon={<AccountCircle />}
        onClick={() => {
          if (status === "authenticated") {
            signOut({
              callbackUrl: "https://api.byu.edu/oauth2/sessions/logout",
            });
          } else {
            signIn("byu-pkce");
          }
        }}
        sx={{ color: "white" }}
      >
        <Typography variant="caption" noWrap fontWeight="500">
          {status === "authenticated" ? "Sign Out" : "Sign In"}
        </Typography>
      </Button>
    </Box>
  );
};

export default SignInButton;
