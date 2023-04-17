import React from "react";
import { SWRConfig } from "swr";
import { useSnackbar } from "notistack";

type Props = {
  children: React.ReactNode;
};

const SwrConfigShim: React.FC<Props> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <SWRConfig
      value={{
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (error.status === 404) return;

          if (retryCount >= 5) return;
        },
        shouldRetryOnError: (err) => {
          if (err.status === 404) return false;
          if (err.status === 401) return false;
          if (err.status === 503) return false;
          return true;
        },
        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            enqueueSnackbar(
              "An error has occured, if this continues to happen, please contact LSIT",
              {
                variant: "error",
                autoHideDuration: 5000,
                key: "error",
                preventDuplicate: true,
              }
            );
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrConfigShim;
