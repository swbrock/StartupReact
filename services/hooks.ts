import usePreSWR, { BareFetcher, Key } from "swr";
import useSWRInfinitePre, { SWRInfiniteKeyLoader } from "swr/infinite";

import { User } from "models/models";
import { APICall as fetcher } from "./services";
import { useSession } from "next-auth/react";

const useSWR = <T>(key: Key, fetcher: BareFetcher<T> | null) => {
  const { status } = useSession();
  return usePreSWR<T>(status === "authenticated" ? key : null, fetcher);
};

const useSWRInfinite = <T>(
  getKey: SWRInfiniteKeyLoader,
  fetcher: BareFetcher<T> | null
) => {
  const { status } = useSession();
  return useSWRInfinitePre<T>(
    status === "authenticated" ? getKey : () => null,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.status === 404) return;

        if (retryCount >= 5) return;
      },
    }
  );
};

//this is an example of a GET request to the API
//call
export const useUsers = () => {
  const { data, error, mutate } = useSWR<User[]>("users", fetcher);

  return {
    users: data,
    error,
    isLoading: !error && !data,
    mutate,
  };
};
