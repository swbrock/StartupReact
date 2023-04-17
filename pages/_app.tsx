import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/globals.css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import {
  CssBaseline,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { ReactElement, ReactNode } from "react";
import { SnackbarKey, SnackbarProvider } from "notistack";

import type { AppProps } from "next/app";
import ClearIcon from "@mui/icons-material/Clear";
import { DefaultSeo } from "next-seo";
import Layout from "../components/shared/layout";
import { NextPage } from "next";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import SwrConfigShim from "components/shared/swr-config";
import createEmotionCache from "../utility/createEmotionCache";
import lightThemeOptions from "../styles/theme/lightThemeOptions";
import store from "../store/store";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<AppPropsWithLayout> = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  const notistackRef = React.createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => {
    notistackRef?.current?.closeSnackbar(key);
  };

  const getLayout =
    Component.getLayout ??
    ((page) => <Layout pageProps={pageProps}>{page}</Layout>);

  return (
    <>
      {/*Uncomment this block of code when the website is ready to go into production
       *
       *Be sure to change the id at the end of the url and the gtag to your G tag that you go from Google Analytics
       */}
      {/* <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-26C99S3SQW"
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'G-26C99S3SQW');`,
        }}
      /> */}
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={lightTheme}>
            <SnackbarProvider
              ref={notistackRef}
              action={(key) => (
                <IconButton onClick={() => onClickDismiss(key)}>
                  <ClearIcon />
                </IconButton>
              )}
            >
              <SessionProvider session={session} refetchOnWindowFocus>
                <SwrConfigShim>
                  <CssBaseline />
                  {getLayout(
                    <>
                      <DefaultSeo
                        titleTemplate="%s | Next DAB"
                        defaultTitle="Next DAB"
                      />
                      <Component {...pageProps} />
                    </>
                  )}
                </SwrConfigShim>
              </SessionProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </>
  );
};

export default MyApp;
