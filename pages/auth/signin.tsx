import { Box, CircularProgress } from "@mui/material";
import { signIn, useSession } from "next-auth/react";

import { NextPageWithLayout } from "pages/_app";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Signin: NextPageWithLayout = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace((router.query.callbackUrl as string) ?? "/");
    } else if (status === "unauthenticated") {
      signIn("byu-pkce", {
        callbackUrl: (router.query.callbackUrl as string) ?? "/",
      });
    }
  }, [router, status]);

  return (
    <Box
      height="100vh"
      width="100vw"
      sx={{ backgroundColor: "rgb(0, 46, 93)" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress sx={{ color: "white" }} />
    </Box>
  );
};

Signin.getLayout = (page) => <Box>{page}</Box>;

export default Signin;
