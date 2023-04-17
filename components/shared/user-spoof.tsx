import { Button, TextField, Box } from "@mui/material";
import React, { useEffect } from "react";

import { getUserByNetId } from "services/services";
import { setDbUser } from "store/dbUser";
import { useAppDispatch } from "store/hooks";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";

function UserSpoof() {
  const [netId, setNetId] = React.useState<string | undefined>();
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const spoofUser = React.useCallback(
    async (spoofUser?: string) => {
      if (spoofUser && process.env.NODE_ENV === "development") {
        try {
          await fetch(`/api/auth/session?spoof`, {
            method: "GET",
            headers: {
              "x-spoof-netid": spoofUser,
            },
          });
          enqueueSnackbar("Spoofed for: " + spoofUser, { variant: "success" });
          const event = new Event("visibilitychange");
          document.dispatchEvent(event);
        } catch (e) {
          enqueueSnackbar("Something went wrong, please try again later", {
            variant: "error",
          });
          console.log(e);
        }
      }
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    if (
      (!session?.user?.fakedNetId || session?.user?.fakedNetId !== netId) &&
      netId
    ) {
      spoofUser(netId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.fakedNetId, spoofUser]);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "column", md: "row" }}
      gap={2}
      padding={2}
      slot="site-title"
      sx={{ m: 0, p: 0 }}
    >
      <TextField
        label="User NetID to spoof"
        onChange={(e) => setNetId(e.target.value)}
        value={netId ?? ""}
        InputLabelProps={{ style: { color: "white" } }}
        size="small"
        sx={{ color: "white", input: { color: "white" } }}
      />
      <Button
        variant="contained"
        sx={{ color: "white" }}
        onClick={() => spoofUser(netId)}
      >
        Spoof
      </Button>
    </Box>
  );
}

export default UserSpoof;
