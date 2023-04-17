import { Box, MenuItem } from "@mui/material";
import {
  bindHover,
  bindMenu,
  usePopupState,
} from "material-ui-popup-state/hooks";

import HoverMenu from "material-ui-popup-state/HoverMenu";
import Link from "next/link";
import React from "react";
import Script from "next/script";
import SignInButton from "./signin-button";
import UserSpoof from "./user-spoof";
import styles from "styles/Home.module.css";
import { useAppDispatch } from "store/hooks";

export default function Layout({ children }: any) {
  const dispatch = useAppDispatch();
  const [showUser, setShowUser] = React.useState(false);
  const popupState = usePopupState({
    variant: "popover",
    popupId: "popup",
  });

  const dbUserLogic = async (netId: string) => {
    // Get the user from the database here, example below
    // const dbUser = await getUserByNetId(netId);
    // dispatch(setDbUser(dbUser));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth: "100%",
        justifyContent: "space-between",
      }}
    >
      <Script
        async
        src="https://cdn.byu.edu/byu-theme-components/latest/byu-theme-components.min.js"
        key="byu-theme-components"
      ></Script>

      <byu-header>
        <byu-breadcrumbs slot="breadcrumbs">
          <a
            id="college-name"
            href="https://lifesciences.byu.edu"
            style={{ color: "white" }}
          >
            College of Life Sciences
          </a>
        </byu-breadcrumbs>
        <SignInButton />
        <h1 slot="site-title">React DAB!</h1>
        {process.env.NODE_ENV === "development" && <UserSpoof />}
        <byu-menu slot="nav">
          <Link href="/">Home</Link>
          <Link href="/table">CRUD Table</Link>
          <Link href="/calendar">Calendar</Link>
          <a {...bindHover(popupState)}>Drop-down Menu</a>
          <HoverMenu
            {...bindMenu(popupState)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Link href="/" passHref legacyBehavior>
              <MenuItem>
                <a>Sample Item (takes to Home)</a>
              </MenuItem>
            </Link>
          </HoverMenu>
        </byu-menu>
      </byu-header>
      <div>{children}</div>
      <byu-footer className={styles.footer}></byu-footer>
    </Box>
  );
}
