import { Box, Button } from "@mui/material";

import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import NotFoundImage from "assets/404.png";
import React from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  return (
    <Box display="flex" justifyContent="center" height="75vh">
      <NextSeo title="Page Not Found" />
      <Box display="flex" flexDirection="column" gap={2} padding={2}>
        <Image alt="Not Found" src={NotFoundImage} objectFit="contain" />
        <Box display="flex" justifyContent="center">
          <Button variant="contained" onClick={() => router.push("/")}>
            Go Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
