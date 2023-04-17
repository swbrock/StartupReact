import { Box, Button } from "@mui/material";

import type { NextPage } from "next";
import React from "react";
import { getErrorMessage } from "components/common/error-message";
import { makeFail } from "../services/services";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import CookieConsent from "react-cookie-consent";

/**
 *
 * @returns The react home page component
 */
const Home: NextPage = () => {
  // Grabs the info for user from the redux store
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  // Simple function that just logs the string "I did something"
  function DoSomething() {
    console.log("I did something");
    makeFail().catch((e) => {
      enqueueSnackbar(getErrorMessage(e), { variant: "error" });
    });
  }
  return (
    <Box className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to NextJS + React!</h1>
        <h1>The user is {session?.user.netId}</h1>
        <Button
          variant="contained"
          onClick={DoSomething}
          size="large"
          style={{ marginTop: "50px" }}
        >
          Do Something
        </Button>
      </main>
      {/**
       * Uncomment the code block below when google analytics has been implemented
       * The code below is required for legal purposes
       */}
      {/* <CookieConsent
        buttonText="Accept"
        style={{ backgroundColor: "white", color: "black" }}
        buttonStyle={{
          backgroundColor: "#002E5D",
          color: "white",
          fontSize: "18px",
        }}
      >
        By clicking “Accept” you agree to the storing of cookies on your device
        for a variety of purposes in order to improve your online experience,
        including to enhance site navigation, analyze site usage, and assist in
        our efforts to remember important information that will make your future
        use of our sites more convenient.
      </CookieConsent> */}
    </Box>
  );
};

export default Home;
