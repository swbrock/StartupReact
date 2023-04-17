import { CheckCircle, DoNotDisturbOn } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

// Make the props generic
interface ApproveDenyProps<T> {
  // Pass the object or data we want to keep track of
  item: T;
  // Return the data when the approve or denied button is clicked
  onApprove: (item: T) => void;
  onDeny: (item: T) => void;
}

const ApproveDenyButtons = <T extends unknown>({
  onApprove,
  onDeny,
  item,
}: ApproveDenyProps<T>) => {
  return (
    <>
      <Tooltip title="Approve" arrow>
        <IconButton color="success" onClick={() => onApprove(item)}>
          <CheckCircle />
        </IconButton>
      </Tooltip>
      <Tooltip title="Deny" arrow>
        <IconButton color="error" onClick={() => onDeny(item)}>
          <DoNotDisturbOn />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ApproveDenyButtons;
